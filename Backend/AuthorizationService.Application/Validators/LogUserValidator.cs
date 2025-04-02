using AuthorizationService.Application.Commands;
using FluentValidation;
using System.Text.RegularExpressions;

namespace AuthorizationService.Application.Validators
{
    public class LogUserValidator : AbstractValidator<LogUserCmd>
    {
        public LogUserValidator()
        {
            RuleFor(x => x.User)
           .NotEmpty()
           .Must(x => CheckUserName(x)).WithMessage("User name is incorrect.");
        }

        private bool CheckUserName(string userName)
        {
            string pattern = @"^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]+)$";
            return Regex.IsMatch(userName, pattern);
        }
    }
}
