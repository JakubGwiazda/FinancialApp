using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Commands.Notifications
{
    public class RegisterDeviceCmd : IRequest<Result>
    {
        public string Token { get; set; }
    }
    public class RegisterDeviceHandler : IRequestHandler<RegisterDeviceCmd, Result>
    {
        private IRegisteredDevicesRepository _repository;
        public RegisterDeviceHandler(IRegisteredDevicesRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(RegisterDeviceCmd cmd, CancellationToken cancellationToken)
        {
            await _repository.AddNewRecord(new RegisteredDevices() { Token = cmd.Token, CreateDate = DateTime.Now });
            return Result.Ok();
        }
    }
}
