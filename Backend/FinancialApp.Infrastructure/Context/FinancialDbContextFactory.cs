using CryptoInfo.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;

namespace FinancialApp.Infrastructure.Context
{
    public class FinancialDbContextFactory : IDesignTimeDbContextFactory<BaseContext>
    {
        public BaseContext CreateDbContext(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

            var basePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? Directory.GetCurrentDirectory(), "FinancialApp");

            var configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
                .Build();

            var connectionString = configuration.GetConnectionString("FinancialDatabase");

            var optionsBuilder = new DbContextOptionsBuilder<BaseContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return new BaseContext(optionsBuilder.Options);
        }

    }
}
