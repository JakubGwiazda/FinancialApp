using FluentResults;
using NotificationService.Application.Interfaces;
using NotificationService.Domain;
using NotificationService.Infrastructure.Context;

namespace NotificationService.Infrastructure.Repositories
{
    internal class RegisteredDevicesRepository : BaseRepository, IRegisteredDevicesRepository
    {
        public RegisteredDevicesRepository(BaseContext baseContext) : base(baseContext)
        {
        }

        public async Task<Result> UpdateDeviceData(int Id, string token)
        {
            try
            {
                var currentData = await GetRecordById<RegisteredDevices>(Id);

                if (currentData == null)
                {
                    return Result.Fail("Entity not found");
                }

                currentData.Token = token;
                await SaveChangesAsync();
                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Update entity was not successful");
            }

        }
    }
}
