using FinancialApp.Application.Interfaces;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Queries
{
    public enum TimePeriod
    {
        h1 = 1,
        h3 = 2,
        h6 = 3,
        h12 = 4,
        d1 = 5,
        d3 = 6,
        d6 = 7,
        d15 = 8,
        d30 = 9,
    }
    public class PriceInfo
    {
        public double Price { get; set; }
        public DateTime Data { get; set; }
    }

    public class GetCryptoDataResponse
    {
        public double? PriceChange { get; set; }
        public string Name { get; set; }
        public List<PriceInfo> PriceData { get; set; }
    }

    public class GetCryptoDataQuery : IRequest<Result<GetCryptoDataResponse>>
    {
        public int TrackedPairId { get; set; }
        public TimePeriod TimePeriod { get; set; }
    }

    public class GetCryptoDataHandler : IRequestHandler<GetCryptoDataQuery, Result<GetCryptoDataResponse>>
    {
        private ICryptoDataRepository _repository;
        public GetCryptoDataHandler(ICryptoDataRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<GetCryptoDataResponse>> Handle(GetCryptoDataQuery query, CancellationToken cancellationToken)
        {
            GetCryptoDataResponse response = new GetCryptoDataResponse();
            var records = await _repository.GetAvgPrices(query.TrackedPairId, query.TimePeriod);
            var priceInfo = records.Select(p => new PriceInfo()
            {
                Price = p.Price,
                Data = p.CreateDate
            }).OrderBy(p => p.Data).ToList();

            if(priceInfo.Count > 0) {
                response = new GetCryptoDataResponse()
                {
                    Name = records.First().Name,
                    PriceChange = CalculatePriceChange(priceInfo),
                    PriceData = priceInfo
                };
            }       

            return Result.Ok(response);
        }

        private double CalculatePriceChange(List<PriceInfo> priceInfos) 
        { 
            var currentPrice = priceInfos.Last().Price;
            var startingPrice = priceInfos.First().Price;
            return ((currentPrice / startingPrice) * 100) - 100;
        }
    }

}
