﻿using FinancialApp.Application.Commands.Notifications;
using FinancialApp.Infrastructure.Services;
using FinancialApp.Infrastructure.Services.FirebaseService;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NSwag.Annotations;
using System.Net;

namespace FinancialApp.Controllers
{
    public class NotificationController : BaseController
    {

        public NotificationController()
        {
        }

        [HttpPost("register-device", Name = "register-device")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> RegisterNotificationReceiver(RegisterDeviceCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [HttpPost("remove-device", Name = "remove-device")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> RemoveRegisteredDevice(RemoveDeviceCmd cmd)
        {
            return await Mediator.Send(cmd);
        }

        [HttpPost("update-device", Name = "update-device")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Result), Description = "The crypto information has been retrieved.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(Result), Description = "Invalid request.")]
        public async Task<Result> RemoveRegisteredDevice(UpdateDeviceCmd cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
