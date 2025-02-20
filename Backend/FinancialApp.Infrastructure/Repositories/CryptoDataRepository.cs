using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
using FinancialApp.Application.Queries;
using FinancialApp.Domain;
using Microsoft.EntityFrameworkCore;

namespace FinancialApp.Infrastructure.Repositories
{
    internal class CryptoDataRepository : ICryptoDataRepository
    {
        private BaseContext _baseContext { get; }

        public CryptoDataRepository(BaseContext baseContext)
        {
            _baseContext = baseContext;
        }
        public async Task<List<CryptoData>> GetAvgPrices(int trackedPairId, TimePeriod timePeriod)
        {
            var edgeTime = CalculateTime(timePeriod);
            return await _baseContext.CryptoData.Where(p => p.TrackedCryptocurrencyId == trackedPairId && p.CreateDate >= edgeTime).ToListAsync();
        }

        private DateTime CalculateTime(TimePeriod timePeriod)
        {
            DateTime now = DateTime.UtcNow;
            DateTime startDate;
            switch (timePeriod)
            {
                case TimePeriod.h1:
                    startDate = now.AddHours(-1);
                    break;
                case TimePeriod.h3:
                    startDate = now.AddHours(-3);
                    break;
                case TimePeriod.h6:
                    startDate = now.AddHours(-6);
                    break;
                case TimePeriod.h12:
                    startDate = now.AddHours(-12);
                    break;
                case TimePeriod.d1:
                    startDate = now.AddDays(-1);
                    break;
                case TimePeriod.d3:
                    startDate = now.AddDays(-3);
                    break;
                case TimePeriod.d6:
                    startDate = now.AddDays(-6);
                    break;
                case TimePeriod.d15:
                    startDate = now.AddDays(-15);
                    break;
                case TimePeriod.d30:
                    startDate = now.AddDays(-30);
                    break;
                default:
                    startDate = now.AddDays(-30);
                    break;
            }
            return startDate;
        }
    }
}
