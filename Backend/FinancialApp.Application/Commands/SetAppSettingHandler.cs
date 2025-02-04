using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Commands
{
    public class SetAppSettingCmd : IRequest<Result>
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public SettingValueType ValueType { get; set; }
    }

    public class SetAppSettingHandler : IRequestHandler<SetAppSettingCmd, Result>
    {

        private ICryptoCurrenciesSettingsRepository _repository;
        public SetAppSettingHandler(ICryptoCurrenciesSettingsRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> Handle(SetAppSettingCmd request, CancellationToken cancellationToken)
        {
            await _repository.AddNewRecord(new AppSettings()
            {
                Name = request.Name,
                Value = request.Value,
                ValueType = request.ValueType
            });

            return Result.Ok();
        }
    }
}
