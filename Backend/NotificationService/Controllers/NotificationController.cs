using FinancialApp.Application.Commands.Notifications;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Commands;
using NotificationService.Infrastructure.Models;
using NotificationService.Infrastructure.Services.FirebaseService;
using NSwag.Annotations;
using System.Net;

namespace NotificationService.Controllers
{
    public class NotificationController : BaseController
    {
        private readonly IFirebaseService _service;

        public NotificationController(IFirebaseService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost("register-device", Name = "register-device")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "Device has been registered.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(Result), Description = "Unauthorized access.")]
        public async Task<Result> RegisterNotificationReceiver(RegisterDeviceCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [Authorize]
        [HttpPost("remove-device", Name = "remove-device")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "Device has been deleted.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(Result), Description = "Unauthorized access.")]
        public async Task<Result> RemoveRegisteredDevice(RemoveDeviceCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [Authorize]
        [HttpPost("update-device", Name = "update-device")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "Device data has been updated.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(Result), Description = "Unauthorized access.")]
        public async Task<Result> RemoveRegisteredDevice(UpdateDeviceCmd cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
