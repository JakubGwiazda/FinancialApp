using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Infrastructure.ExternalApiClients.Models.Binance
{
    internal class AvgPrice
    {
        public int Mins { get; set; }
        public double Price { get; set; }
        public long CloseTime { get; set; }
    }
}
