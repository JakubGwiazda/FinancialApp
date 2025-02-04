using Microsoft.Extensions.Hosting;

namespace FinancialApp.Infrastructure.Workers
{
    internal class RequestWorker : BackgroundService
    {
        private readonly HttpClient _httpClient;

        public RequestWorker()
        {
            this._httpClient = new HttpClient();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {

                try
                {
                    var apiUrl = "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT";
                    Console.WriteLine("Wykounje request");
                    /* HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                     if (response.IsSuccessStatusCode)
                     {

                         string jsonResponse = await response.Content.ReadAsStringAsync();
                     }*/
                }
                catch (Exception ex)
                {
                    throw;
                }

                await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);
            }

        }
    }
}