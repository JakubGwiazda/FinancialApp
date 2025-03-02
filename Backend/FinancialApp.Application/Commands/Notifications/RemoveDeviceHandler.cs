using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Commands.Notifications
{
    public class RemoveDeviceCmd : IRequest<Result>
    {
        public int Id { get; set; }
    }
    public class RemoveDeviceHandler : IRequestHandler<RemoveDeviceCmd, Result>
    {
        private IRegisteredDevicesRepository _repository;
        public RemoveDeviceHandler(IRegisteredDevicesRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> Handle(RemoveDeviceCmd request, CancellationToken cancellationToken)
        {

            var record = await _repository.GetRecordById<RegisteredDevices>(request.Id);
            await _repository.DeleteRecord(record);

            return Result.Ok();
        }
    }
}
