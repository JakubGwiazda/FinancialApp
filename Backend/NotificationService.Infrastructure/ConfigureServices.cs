using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NotificationService.Application.Interfaces;
using NotificationService.Infrastructure.Context;
using NotificationService.Infrastructure.Repositories;
using NotificationService.Infrastructure.Services.FirebaseService;
using NotificationService.Infrastructure.Services.RabbitMQ;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<BaseContext>(options => options.UseNpgsql(configuration.GetConnectionString("NotificationDatabase")));

        services.AddScoped<IFirebaseService, FirebaseService>();
        services.AddScoped<IRegisteredDevicesRepository, RegisteredDevicesRepository>();
        services.AddHostedService(serviceProvider =>
        {
            var scopeFactory = serviceProvider.GetRequiredService<IServiceScopeFactory>();
            return new RabbitMQClient(configuration, scopeFactory);
        });

        FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "firebase_config.json")),
        });

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