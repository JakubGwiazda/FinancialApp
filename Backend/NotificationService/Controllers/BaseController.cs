using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace NotificationService.Controllers
{
    [Route("notification/[controller]")]
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        private ISender _mediator = null!;
        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    }
}
