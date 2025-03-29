using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Queries
{
    public class GetAppSettingsResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public SettingValueType ValueType { get; set; }
        public string Description { get; set; }
    }

    public class GetAppSettingsQuery : IRequest<Result<List<GetAppSettingsResponse>>>
    {
    }
    public class GetAppSettingsHandler : IRequestHandler<GetAppSettingsQuery, Result<List<GetAppSettingsResponse>>>
    {
        private ICryptoCurrenciesSettingsRepository _repository;

        public GetAppSettingsHandler(ICryptoCurrenciesSettingsRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<List<GetAppSettingsResponse>>> Handle(GetAppSettingsQuery request, CancellationToken cancellationToken)
        {
            var data = await _repository.GetAllRecords<AppSettings>();
            
            return data.Select(p => new GetAppSettingsResponse()
            {
                Id = p.Id,
                Name = p.Name,
                Value = p.Value,
                ValueType = p.ValueType,
                Description = p.Description,
            }).ToList();
        }
    }
}
