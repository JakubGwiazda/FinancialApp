using FinancialApp.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace FinancialApp.Controllers
{
    public class NotificationController : BaseController
    {

        private readonly IHubContext<NotificationService> _hubContext;

        public NotificationController(IHubContext<NotificationService> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("sendNotification")]
        public async Task<IActionResult> SendNotification([FromBody] string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
            return Ok(new { Message = "Notification sent" });
        }
    }
}
