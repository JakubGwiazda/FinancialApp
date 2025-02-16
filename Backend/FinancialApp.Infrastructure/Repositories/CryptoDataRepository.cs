using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
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
        public async Task<List<CryptoData>> GetAvgPrices(int trackedPairId)
        {
            return await _baseContext.CryptoData.Where(p => p.TrackedCryptocurrencyId == trackedPairId).ToListAsync();
        }
    }
}
