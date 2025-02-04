using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
using FinancialApp.Infrastructure.Repositories;
using FinancialApp.Infrastructure.Workers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SQLitePCL;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigurationServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        Batteries.Init();
        var connectionString = configuration.GetConnectionString("FinancialDatabase");

        services.AddDbContext<BaseContext>(options =>
            options.UseSqlite(connectionString));
        services.AddHostedService<RequestWorker>();

        services.AddScoped<ICryptoCurrenciesSettingsRepository, CryptoCurrenciesSettingsRepository>();
        return services;
    }
}