using FinancialApp.Application.Interfaces;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Queries
{
    public class GetCryptoDataResponse
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public double? PriceChange { get; set; }
        public DateTime Data { get; set; }
    }

    public class GetCryptoDataQuery : IRequest<Result<List<GetCryptoDataResponse>>>
    {
        public int TrackedPairId { get; set; }
    }

    public class GetCryptoDataHandler : IRequestHandler<GetCryptoDataQuery, Result<List<GetCryptoDataResponse>>>
    {
        private ICryptoDataRepository _repository;
        public GetCryptoDataHandler(ICryptoDataRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<List<GetCryptoDataResponse>>> Handle(GetCryptoDataQuery query, CancellationToken cancellationToken)
        {
            var records = await _repository.GetAvgPrices(query.TrackedPairId);
            var data = records.Select(p => new GetCryptoDataResponse()
            {
                Name = p.Name,
                Price = p.Price,
                PriceChange = p.PriceChange,
                Data = p.CreateDate
            }).OrderBy(p => p.Data).ToList();

            return Result.Ok(data);
        }
    }

}
