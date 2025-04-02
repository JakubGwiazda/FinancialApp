using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace AuthorizationService.Application.Validators.Configuration
{
    public class ValidationExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is ValidationException validationException)
            {
                var errors = validationException.Errors
                    .Select(e => new { Field = e.PropertyName, Message = e.ErrorMessage })
                    .ToList();

                context.Result = new JsonResult(new
                {
                    Success = false,
                    Errors = errors
                })
                {
                    StatusCode = (int)HttpStatusCode.BadRequest
                };

                context.ExceptionHandled = true;
            }
        }
    }
}
