using FinancialApp.Application.Commands.Notifications;
using FinancialApp.Application.Queries;
using FinancialApp.Infrastructure.ExternalApiClients.Models.Firebase;
using FinancialApp.Infrastructure.Services;
using FinancialApp.Infrastructure.Services.FirebaseService;
using FirebaseAdmin.Messaging;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NSwag.Annotations;
using System.Net;

namespace FinancialApp.Controllers
{
    public class NotificationController : BaseController
    {

        private readonly IHubContext<NotificationService> _hubContext;
        private readonly IFcmService _service;

        public NotificationController(IFcmService service)
        {
            _service = service;
        }

        [HttpPost("sendNotification")]
        public async Task<IActionResult> SendNotification([FromBody] string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
            return Ok(new { Message = "Notification sent" });
        }

        [HttpPost]
        public async Task<IActionResult> SendNotificationeAsync([FromBody] MessageRequest request)
        {
            await _service.SendNotificationAsync(request.Title, request.Body);
            return Ok();
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
