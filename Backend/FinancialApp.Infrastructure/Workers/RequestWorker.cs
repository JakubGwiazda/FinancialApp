﻿using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FinancialApp.Infrastructure.Common.Enums;
using FinancialApp.Infrastructure.Common.Helpers;
using FinancialApp.Infrastructure.ExternalApiClients;
using FinancialApp.Infrastructure.Services;
using FinancialApp.Infrastructure.Workers.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json;
using Serilog;

namespace FinancialApp.Infrastructure.Workers
{
    internal class RequestWorker : BackgroundService
    {
        private readonly HttpClient _httpClient;
        private const string apiUrl = "https://api.binance.com/api/v3/avgPrice?symbol=";
        private readonly IServiceScopeFactory _scopeFactory;
        private BinanceClient _client;
        private readonly IRabbitMQProducer _notificationProducer;
        private readonly ILogService _logger;
        public RequestWorker(IServiceScopeFactory scopeFactory, IRabbitMQProducer rabbitMQProducer, ILogService logger)
        {
            _httpClient = new HttpClient();
            _scopeFactory = scopeFactory;
            _client = new BinanceClient();
            _notificationProducer = rabbitMQProducer;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {

                int breakBetweenRequests = 60;

                using (var scope = _scopeFactory.CreateScope())
                {

                    try
                    {
                        var repository = scope.ServiceProvider.GetRequiredService<ICryptoCurrenciesSettingsRepository>();
                        var trackedData = await repository.GetAllRecords<TrackedCryptocurrencies>(p => p.CollectData);
                        var requestSettings = await repository.GetRecord<AppSettings>(p => p.Name == SettingType.RequestFrequency.ToString());
                        var priceChangeOver = await repository.GetRecord<AppSettings>(p => p.Name == SettingType.PriceChangeOver.ToString());
                        var numberOfResultsToCheckPriceChange = await repository.GetRecord<AppSettings>(p => p.Name == SettingType.NumberOfResultsToCheckPriceChange.ToString());

                        breakBetweenRequests = TypesConverter.ConvertToType<int>(requestSettings.Value, requestSettings.ValueType);
                        var notificationTriggeredLevel = TypesConverter.ConvertToType<int>(priceChangeOver.Value, priceChangeOver.ValueType);
                        var numberOfRecordsToCheck = TypesConverter.ConvertToType<int>(numberOfResultsToCheckPriceChange.Value, numberOfResultsToCheckPriceChange.ValueType);

                        foreach (var record in trackedData)
                        {
                            var lastData = await repository.GetLastCryptoUpdate(record.Id);
                            var symbol = record.Name + record.ReferenceCurrencyName;
                            var avgPrice = await _client.GetAvgPrice(symbol);

                            record.CryptoData.Add(new CryptoData()
                            {
                                Name = symbol,
                                Price = avgPrice.Price,
                                PriceChange = CalculatePriceChange(lastData, avgPrice.Price),
                                CreateDate = DateTime.UtcNow,
                                TrackedCryptocurrency = record
                            });
                            await repository.SaveChangesAsync();

                            var lastResults = await repository.GetLastResults(record.Id, numberOfRecordsToCheck);
                            if (Math.Abs(CheckDifference(lastResults)) > notificationTriggeredLevel)
                            {
                                var message = new MessageRequest() {
                                    Title = "Price changes!",
                                    Body = $"Pair: {symbol} changed price. Current: {Math.Round(lastResults.First().Price, 3)} - previous: {Math.Round(lastResults.Last().Price, 3)}" };
                                _notificationProducer.PublishNotification(JsonSerializer.Serialize(message));
                            }
                        }

                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Error during downloading stock data: {ex}");
                    }
                }
                
                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
            }
        }

        private double CheckDifference(List<CryptoData> data)
        {
            var lastRecord = data.First();
            var firstRecord = data.Last();
            return CalculatePriceChange(firstRecord, lastRecord.Price);
        }

        private double CalculatePriceChange(CryptoData? lastData, double currentPrice)
        {
            if (lastData == null)
            {
                return currentPrice;
            }
            else
            {
                return ((currentPrice / lastData.Price) * 100) - 100;
            }
        }
    }
}