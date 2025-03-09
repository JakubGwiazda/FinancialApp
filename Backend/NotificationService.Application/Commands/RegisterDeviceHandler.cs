using FluentResults;
using MediatR;
using NotificationService.Application.Interfaces;
using NotificationService.Domain;

namespace NotificationService.Application.Commands
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
