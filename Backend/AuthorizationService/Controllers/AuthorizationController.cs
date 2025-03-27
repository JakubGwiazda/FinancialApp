using AuthorizationService.Application.Commands;
using AuthorizationService.Application.Queries;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AuthorizationService.Controllers
{
    public class AuthorizationController : BaseController
    {
        [HttpPost("register-user", Name = "register-user")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<string>), Description = "User was registered.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<string>> RegisterUser(RegisterUserCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [HttpPost("login", Name = "login")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<string>), Description = "User was logged.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<string>> TrackNewCrypto(LogUserCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [Authorize]
        [HttpPost("get-token", Name = "get-token")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<string>), Description = "Token was generated.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<string>> GetNewToken(GetNewTokenCmd cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
