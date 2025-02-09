using Newtonsoft.Json;

namespace FinancialApp.Infrastructure.ExternalApiClients.Models.Binance
{
    internal class AvgPrice
    {
        [JsonProperty("mins")]
        public int Mins { get; set; }
        [JsonProperty("price")]
        public double Price { get; set; }
        [JsonProperty("closeTime")]
        public long CloseTime { get; set; }
    }
}
