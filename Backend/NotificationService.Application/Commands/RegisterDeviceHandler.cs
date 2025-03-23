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
            var data = await _repository.GetRecord<RegisteredDevices>(p => p.Token == cmd.Token);

            if(data == null)
            {
                await _repository.AddNewRecord(new RegisteredDevices() { Token = cmd.Token, CreateDate = DateTime.Now });
            }

            return Result.Ok();
        }
    }
}
