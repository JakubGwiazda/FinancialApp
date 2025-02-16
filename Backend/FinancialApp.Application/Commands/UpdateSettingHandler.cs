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
    public class UpdateSettingCmd : IRequest<Result>
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }
    internal class UpdateSettingHandler : IRequestHandler<UpdateSettingCmd, Result>
    {
        private ICryptoCurrenciesSettingsRepository _repository;

        public UpdateSettingHandler(ICryptoCurrenciesSettingsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(UpdateSettingCmd request, CancellationToken cancellationToken)
        {

            var currentData = await _repository.GetRecordById<AppSettings>(request.Id);

            if (currentData == null)
            {
                return Result.Fail("Entity not found");
            }

            await _repository.UpdateRecord(request, currentData);

            return Result.Ok();
        }
    }
}
