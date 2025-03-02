using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Application.Commands.Notifications
{
    public class UpdateDeviceCmd : IRequest<Result>
    {
        public int Id { get; set; }
        public string Token { get; set; }
    }
    public class UpdateDeviceHandler : IRequestHandler<UpdateDeviceCmd, Result>
    {
        private IRegisteredDevicesRepository _repository;

        public UpdateDeviceHandler(IRegisteredDevicesRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(UpdateDeviceCmd request, CancellationToken cancellationToken)
        {
            await _repository.UpdateDeviceData(request.Id, request.Token);
            return Result.Ok();
        }
    }
}
