using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Application.Commands
{
    public class RemoveTrackedCryptoCmd : IRequest<Result>
    {
        public int Id { get; set; }
    }
    public class RemoveTrackedCryptoHandler : IRequestHandler<RemoveTrackedCryptoCmd, Result>
    {
        private ICryptoCurrenciesSettingsRepository _repository;

        public RemoveTrackedCryptoHandler(ICryptoCurrenciesSettingsRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> Handle(RemoveTrackedCryptoCmd request, CancellationToken cancellationToken)
        {
            try
            {
                var record = await _repository.GetRecordById<TrackedCryptocurrencies>(request.Id);
                await _repository.DeleteRecord(record);                

                return Result.Ok();

            } catch (Exception) {
                return Result.Fail("Item cannot be deleted");
            }
        }
    }
}
