using FinancialApp.Application.Commands;
using FinancialApp.Application.Queries;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace FinancialApp.Controllers
{

    public class CryptoDataController : BaseController
    {
        [HttpPost("get-avg-prices", Name = "get-avg-prices")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<List<GetCryptoDataResponse>>), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<List<GetCryptoDataResponse>>> TrackNewCrypto(GetCryptoDataQuery cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
