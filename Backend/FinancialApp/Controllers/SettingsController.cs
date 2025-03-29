using FinancialApp.Application.Commands;
using FinancialApp.Application.Queries;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.ComponentModel;
using System.Net;
using System.Security.Authentication;

namespace FinancialApp.Controllers
{
    public class SettingsController : BaseController
    {
        [Authorize]
        [HttpGet("get-settings", Name = "get-settings")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<List<GetAppSettingsResponse>>), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(Result), Description = "Unauthorized access.")]
        public async Task<Result<List<GetAppSettingsResponse>>> GetSettings()
        {
            return await Mediator.Send(new GetAppSettingsQuery());
        }

        [Authorize]
        [HttpPost("add-tracker", Name = "add-tracker")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> TrackNewCrypto(TrackNewCryptoCmd cmd)
        {
            var response = await Mediator.Send(cmd);

            return Result.Ok();
        }

        [Authorize]
        [HttpGet("get-tracker-pairs", Name = "get-tracker-pairs")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<List<GetTrackedCryptoResponse>>), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<List<GetTrackedCryptoResponse>>> GetAllTrackedPairs()
        {
            return await Mediator.Send(new GetTrackedCryptoQuery());
        }

        [Authorize]
        [HttpPost("set-setting", Name = "set-setting")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> SetSetting(SetAppSettingCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [Authorize]
        [HttpPost("remove-tracker", Name = "remove-tracker")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "Tracker has been removed")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> SetSetting(RemoveTrackedCryptoCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [Authorize]
        [HttpPost("update-tracked-pair", Name = "update-tracked-pair")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "Tracker has been removed")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> UpdateTrackedPair(UpdateTrackedPairCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [Authorize]
        [HttpPost("update-settings", Name = "update-settings")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "Tracker has been removed")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> UpdateTrackedPair(UpdateSettingCmd cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
