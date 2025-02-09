using FinancialApp.Infrastructure.ExternalApiClients.Models.Binance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FinancialApp.Infrastructure.ExternalApiClients
{
    internal class BinanceClient
    {
        private readonly HttpClient _httpClient;
        private const string apiUrl = "https://api.binance.com/api/v3/avgPrice?symbol=";
        public BinanceClient()
        {
            _httpClient = new HttpClient();
        }

        public async Task<AvgPrice> GetAvgPrice(string assetSymbol)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl + assetSymbol);
            string jsonResponse = await response.Content.ReadAsStringAsync();
            AvgPrice avgPrice = JsonSerializer.Deserialize<AvgPrice>(jsonResponse);
            return avgPrice;
        }
    }
}
