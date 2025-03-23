using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;

namespace FinancialApp.Infrastructure.Repositories
{
    internal class UsersRepository : BaseRepository, IUsersRepository
    {
        public UsersRepository(BaseContext baseContext) : base(baseContext)
        {
            
        }
    }
}
