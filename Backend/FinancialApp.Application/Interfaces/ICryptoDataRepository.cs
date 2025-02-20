using FinancialApp.Application.Queries;
using FinancialApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Application.Interfaces
{
    public interface ICryptoDataRepository
    {
        Task<List<CryptoData> >GetAvgPrices(int trackedPairId, TimePeriod timePeriod);
    }
}
