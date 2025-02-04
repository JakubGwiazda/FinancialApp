using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Queries
{
    public class GetTrackedCryptoResponse
    {
        public int Id { get; set; }
        public string CryptoCurrencySymbol { get; set; }
        public string FiatCurrencySymbol { get; set; }
    }

    public class GetTrackedCryptoQuery : IRequest<Result<List<GetTrackedCryptoResponse>>>
    {
    }

    public class GetTrackedCryptoHandler : IRequestHandler<GetTrackedCryptoQuery, Result<List<GetTrackedCryptoResponse>>>
    {
        private ICryptoCurrenciesSettingsRepository _repository;
        public GetTrackedCryptoHandler(ICryptoCurrenciesSettingsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<List<GetTrackedCryptoResponse>>> Handle(GetTrackedCryptoQuery request, CancellationToken cancellationToken)
        {
            var data = await _repository.GetAllRecords<CryptoCurrenciesSettings>();

            var results = data.Select(p => new GetTrackedCryptoResponse() 
            {
                Id = p.Id,
                CryptoCurrencySymbol = p.CryptoCurrencySymbol,
                FiatCurrencySymbol = p.FiatCurrencySymbol
            }).ToList();

            return Result.Ok(results);
        }
    }
}
