using FinancialApp.Application.Commands;
using FinancialApp.Application.Queries;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace FinancialApp.Controllers
{

    public class CryptoDataController : BaseController
    {
        [Authorize]
        [HttpPost("get-avg-prices", Name = "get-avg-prices")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<GetCryptoDataResponse>), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<GetCryptoDataResponse>> TrackNewCrypto(GetCryptoDataQuery cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
