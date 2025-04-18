﻿using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Commands
{
    public class UpdateTrackedPairCmd : IRequest<Result>
    {
        public int Id { get; set; }
        public bool CollectData { get; set; }
    }

    internal class UpdateTrackedPairHandler : IRequestHandler<UpdateTrackedPairCmd, Result>
    {
        private ICryptoCurrenciesSettingsRepository _repository;
        public UpdateTrackedPairHandler(ICryptoCurrenciesSettingsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(UpdateTrackedPairCmd request, CancellationToken cancellationToken)
        {
            var currentData = await _repository.GetRecordById<TrackedCryptocurrencies>(request.Id);

            if (currentData == null)
            {
                return Result.Fail("Entity not found");
            }

            await _repository.UpdateRecord(request, currentData);

            return Result.Ok();
        }
    }
}
