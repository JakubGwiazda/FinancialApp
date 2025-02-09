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
        services.AddScoped<ICryptoCurrenciesSettingsRepository, CryptoCurrenciesSettingsRepository>();

        services.AddDbContext<BaseContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("FinancialDatabase")));
        services.AddHostedService<RequestWorker>();

        return services;
    }
}