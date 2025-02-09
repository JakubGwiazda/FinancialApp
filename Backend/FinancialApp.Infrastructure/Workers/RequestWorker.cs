﻿using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FinancialApp.Infrastructure.ExternalApiClients;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FinancialApp.Infrastructure.Workers
{
    internal class RequestWorker : BackgroundService
    {
        private readonly HttpClient _httpClient;
        private ICryptoCurrenciesSettingsRepository _repository;
        //private const string apiUrl = "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT";
        private const string apiUrl = "https://api.binance.com/api/v3/avgPrice?symbol=";
        private readonly IServiceScopeFactory _scopeFactory;
        private BinanceClient _client;
        public RequestWorker(IServiceScopeFactory scopeFactory)
        {
            _httpClient = new HttpClient();
            _scopeFactory = scopeFactory;
            _client = new BinanceClient();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
             
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var repository = scope.ServiceProvider.GetRequiredService<ICryptoCurrenciesSettingsRepository>();
                    var trackedData = await repository.GetAllRecords<TrackedCryptocurrencies>(p => p.CollectData);

                    try
                    {
                        foreach (var record in trackedData)
                        {
                            var sumbol = record.Name + record.ReferenceCurrencyName;
                            var avgPrice = await _client.GetAvgPrice(sumbol);
                            record.CryptoData.Add(new CryptoData()
                            {
                                Name = sumbol,
                                Price = avgPrice.Price,
                                CreateDate = DateTime.Now,                                
                            });
                            await _repository.UpdateRecord(record);
                        }

                    }
                    catch (Exception ex)
                    {
                        throw;
                    }
                }

                await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);
            }

        }
    }
}