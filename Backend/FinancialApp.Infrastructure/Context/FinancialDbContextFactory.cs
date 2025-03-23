using CryptoInfo.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace FinancialApp.Infrastructure.Context
{
    public class FinancialDbContextFactory : IDesignTimeDbContextFactory<BaseContext>
    {
        public BaseContext CreateDbContext(string[] args)
        {

            var basePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? Directory.GetCurrentDirectory(), "FinancialApp");

            var configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            var connectionString = configuration.GetConnectionString("FinancialDatabase");

            var optionsBuilder = new DbContextOptionsBuilder<BaseContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return new BaseContext(optionsBuilder.Options);
        }

    }
}
