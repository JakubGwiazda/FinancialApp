using FinancialApp.Infrastructure.ExternalApiClients.Models.Binance;
using Newtonsoft.Json;
using System.Text.Json;

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
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl + assetSymbol);
            string jsonResponse = await response.Content.ReadAsStringAsync();
            AvgPrice avgPrice = JsonConvert.DeserializeObject<AvgPrice>(jsonResponse);
            return avgPrice;
        }
    }
}
