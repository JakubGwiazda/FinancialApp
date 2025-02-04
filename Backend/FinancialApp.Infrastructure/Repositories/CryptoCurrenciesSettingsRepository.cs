using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace FinancialApp.Infrastructure.Repositories
{
    internal class CryptoCurrenciesSettingsRepository : ICryptoCurrenciesSettingsRepository
    {
        private BaseContext _baseContext { get; }
        public CryptoCurrenciesSettingsRepository(BaseContext baseContext)
        {
            _baseContext = baseContext;
        }

        public async Task<Result> AddNewRecord<T>(T data) where T : class
        {
            if (data == null)
            {
                return Result.Fail("Cannot add a null entity.");
            }

            try
            {
                await _baseContext.AddAsync(data);
                await _baseContext.SaveChangesAsync();
                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail($"Error adding record: {ex.Message}");
            }
        }

        public Task<Result> DeleteRecord<T>(T data) where T : class
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAllRecords<T>() where T : class
        {
            return await _baseContext.Set<T>().ToListAsync();
        }
    }
}
