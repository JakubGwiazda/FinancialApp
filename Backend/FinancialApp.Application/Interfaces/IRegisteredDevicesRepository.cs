using FluentResults;

namespace FinancialApp.Application.Interfaces
{
    public interface IRegisteredDevicesRepository : IBaseRepositoryOperation
    {
        Task<Result> UpdateDeviceData(int Id, string token);
    }
}
