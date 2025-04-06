using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;

namespace NotificationService.Filters;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

    public ApiExceptionFilterAttribute()
    {
        _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
        {
            {typeof(ValidationException), HandleValidationException},
            {typeof(UnauthorizedAccessException), HandleUnauthorizedAccessException},
        };
    }

    public override void OnException(ExceptionContext context)
    {
        HandleException(context);

        base.OnException(context);
    }

    private void HandleException(ExceptionContext context)
    {
        Type type = context.Exception.GetType();
        if (_exceptionHandlers.ContainsKey(type))
        {
            _exceptionHandlers[type].Invoke(context);
            return;
        }
    }

    private void HandleValidationException(ExceptionContext context)
    {
        ValidationException exception = (ValidationException)context.Exception;

        var errorMessages = exception.Errors.Select(e => e.ErrorMessage).ToList();

        context.Result = new ObjectResult(errorMessages)
        {
            StatusCode = StatusCodes.Status400BadRequest
        };
        context.ExceptionHandled = true;
    }

    private void HandleUnauthorizedAccessException(ExceptionContext context)
    {
        ProblemDetails details = new()
        {
            Status = StatusCodes.Status401Unauthorized,
            Title = "Nieautoryzowany dostęp",
        };

        context.Result = new ObjectResult(details) { StatusCode = StatusCodes.Status401Unauthorized };

        context.ExceptionHandled = true;
    }
}