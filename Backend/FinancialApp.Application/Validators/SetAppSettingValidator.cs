using FinancialApp.Application.Commands;
using FinancialApp.Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Application.Validators
{
    public class SetAppSettingValidator : AbstractValidator<SetAppSettingCmd>
    {
        public SetAppSettingValidator()
        {
            RuleFor(x => x.Name)
           .NotEmpty().WithMessage("Name is required.");

            RuleFor(x => x.Value)
                .NotEmpty().WithMessage("Value is required.")
                .Must((cmd, value) => IsValidType(value, cmd.ValueType))
                .WithMessage("Value does not match the declared ValueType.");
        }

        private bool IsValidType(string value, SettingValueType valueType)
        {
            return valueType switch
            {
                SettingValueType.String => true,
                SettingValueType.Integer => int.TryParse(value, out _),
                SettingValueType.Bool => bool.TryParse(value, out _),
                SettingValueType.Date => DateTime.TryParse(value, out _),
                _ => false
            };
        }
    }
}
