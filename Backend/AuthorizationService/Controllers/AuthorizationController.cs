using AuthorizationService.Application.Commands;
using AuthorizationService.Application.Queries;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

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
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<LogUserResponse>), Description = "User was logged.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<LogUserResponse>> LoginUser(LogUserCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [Authorize]
        [HttpGet("refresh-token", Name = "refresh-token")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result<string>), Description = "Token was generated.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result<string>> RefreshToken()
        {                     
            return await Mediator.Send(new GetNewTokenCmd() { User = User.FindFirstValue(JwtRegisteredClaimNames.Name) });
        }
    }
}
