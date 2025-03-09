using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using NotificationService.Infrastructure.Context;
using NotificationService.Infrastructure.Services.FirebaseService;
using NotificationService.Infrastructure.Services.RabbitMQ;
using RabbitMQ.Client;
using System;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<BaseContext>(options => options.UseSqlite(configuration.GetConnectionString("FinancialDatabase")));
        services.AddScoped<IFirebaseService, FirebaseService>();
        services.AddHostedService(serviceProvider =>
        {
            var scopeFactory = serviceProvider.GetRequiredService<IServiceScopeFactory>();
            return new RabbitMQClient(configuration, scopeFactory);
        });

        FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "firebasePrivateKey.json")),
        });

        return services;
    }
}
