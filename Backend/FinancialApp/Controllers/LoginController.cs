using FinancialApp.Application.Commands;
using FinancialApp.Application.Queries;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace FinancialApp.Controllers
{
    public class LoginController : BaseController
    {
        [HttpPost("register-user", Name = "register-user")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> RegisterUser(AddUserCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [HttpPost("login", Name = "login")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> TrackNewCrypto(LoginUserCmd cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
