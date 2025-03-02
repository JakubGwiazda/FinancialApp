using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
using FinancialApp.Infrastructure.Repositories;
using FinancialApp.Infrastructure.Services.FirebaseService;
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
        services.AddScoped<ICryptoDataRepository, CryptoDataRepository>();
        services.AddScoped<IRegisteredDevicesRepository, RegisteredDevicesRepository>();
        services.AddScoped<IFcmService, FcmService>();


        services.AddDbContext<BaseContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("FinancialDatabase")));

        services.AddHostedService<RequestWorker>();
        services.AddSignalR();

        return services;
    }
}