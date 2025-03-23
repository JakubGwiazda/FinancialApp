using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
using FinancialApp.Infrastructure.Repositories;
using FinancialApp.Infrastructure.Services;
using FinancialApp.Infrastructure.Workers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigurationServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ICryptoCurrenciesSettingsRepository, CryptoCurrenciesSettingsRepository>();
        services.AddScoped<ICryptoDataRepository, CryptoDataRepository>();
        services.AddScoped<IUsersRepository, UsersRepository>();

        services.AddSingleton<IRabbitMQProducer, RabbitMQProducer>(sp =>
        {
            return RabbitMQProducer.CreateAsync(configuration).GetAwaiter().GetResult();
        });
            
        services.AddDbContext<BaseContext>(options => options.UseNpgsql(configuration.GetConnectionString("FinancialDatabase")));

        services.AddHostedService<RequestWorker>();

        return services;
    }
}