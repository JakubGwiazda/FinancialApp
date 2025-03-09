using FluentResults;

namespace NotificationService.Application.Interfaces
{
    public interface IRegisteredDevicesRepository : IBaseOperations
    {
        Task<Result> UpdateDeviceData(int Id, string token);
    }
}
