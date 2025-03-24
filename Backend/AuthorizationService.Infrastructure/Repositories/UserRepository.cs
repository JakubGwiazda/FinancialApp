using AuthorizationService.Application.Interfaces;
using AuthorizationService.Infrastructure.Context;

namespace AuthorizationService.Infrastructure.Repositories
{
    internal class UserRepository: BaseRepository, IUserRepository
    {
        public UserRepository(BaseContext baseContext) : base(baseContext)
        {
        }
    }
}
