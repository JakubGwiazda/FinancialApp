using FinancialApp.Application.Commands;
using FluentValidation;

namespace FinancialApp.Application.Validators
{
    public class UpdateSettingValidator : AbstractValidator<UpdateSettingCmd>
    {
        public UpdateSettingValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required.");
        }
    }
}
