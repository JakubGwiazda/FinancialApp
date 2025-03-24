using AuthorizationService.Application.Commands;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AuthorizationService.Controllers
{
    public class AuthorizationController : BaseController
    {
        [HttpPost("register-user", Name = "register-user")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "User was registered.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> RegisterUser(RegisterUserCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [HttpPost("login", Name = "login")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "User was logged.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> TrackNewCrypto(LogUserCmd cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
