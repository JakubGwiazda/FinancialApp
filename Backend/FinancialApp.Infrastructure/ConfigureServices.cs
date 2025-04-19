using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
using FinancialApp.Infrastructure.Repositories;
using FinancialApp.Infrastructure.Services;
using FinancialApp.Infrastructure.Workers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigurationServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ICryptoCurrenciesSettingsRepository, CryptoCurrenciesSettingsRepository>();
        services.AddScoped<ICryptoDataRepository, CryptoDataRepository>();
        services.AddScoped<ILogService, LogService>();
        services.AddSingleton<IRabbitMQProducer, RabbitMQProducer>(sp =>
        {
            return RabbitMQProducer.CreateAsync(configuration).GetAwaiter().GetResult();
        });

        services.AddDbContext<BaseContext>(options => options.UseNpgsql(configuration.GetConnectionString("FinancialDatabase")));
        
        services.AddHostedService<RequestWorker>();

        return services;    
    }
}

public static class MigrationManager
{
    public static void RunMigration(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var db = services.GetRequiredService<BaseContext>();
            db.Database.Migrate();
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<BaseContext>>();
            logger.LogError(ex, "Updating database failed.");
            throw;
        }
    }
}