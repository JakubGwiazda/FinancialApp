using FinancialApp.Application.Commands;
using FinancialApp.Domain;
using FluentResults;

namespace FinancialApp.Application.Interfaces
{
    public interface ICryptoCurrenciesSettingsRepository : IBaseRepositoryOperation
    {
        Task<Result> UpdateRecord(UpdateTrackedPairCmd request, CryptoCurrenciesSettings data);
    }
}
