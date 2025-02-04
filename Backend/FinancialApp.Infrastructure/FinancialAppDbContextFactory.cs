using CryptoInfo.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace FinancialApp.Infrastructure
{
    public class FinancialAppDbContextFactory : IDesignTimeDbContextFactory<BaseContext>
    {
        public BaseContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<BaseContext>();

            optionsBuilder.UseSqlite("Data Source=Database/FinancialDb.db");

            return new BaseContext(optionsBuilder.Options);
        }
    }
}
