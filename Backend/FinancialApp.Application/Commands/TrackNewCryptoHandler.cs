using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;
namespace FinancialApp.Application.Commands
{
    public class TrackNewCryptoCmd : IRequest<Result>
    {
        public string CryptoSymbol { get; set; }
        public string FiatSymbol { get; set; }
    }

    public class TrackNewCryptoHandler : IRequestHandler<TrackNewCryptoCmd, Result>
    {
        private ICryptoCurrenciesSettingsRepository _cryptoCurrenciesSettingsRepository;
        public TrackNewCryptoHandler(ICryptoCurrenciesSettingsRepository cryptoCurrenciesSettingsRepository)
        {
            _cryptoCurrenciesSettingsRepository = cryptoCurrenciesSettingsRepository;
        }

        public async Task<Result> Handle(TrackNewCryptoCmd request, CancellationToken cancellationToken)
        {
            var a = await _cryptoCurrenciesSettingsRepository.AddNewRecord(new CryptoCurrenciesSettings {
                CryptoCurrencySymbol = request.CryptoSymbol, 
                FiatCurrencySymbol = request.FiatSymbol 
            });

            return Result.Ok();
        }
    }
}
