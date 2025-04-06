using AuthorizationService.Application.Interfaces;
using AuthorizationService.Infrastructure.Context;
using AuthorizationService.Infrastructure.Jwt;
using AuthorizationService.Infrastructure.Managers;
using AuthorizationService.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<BaseContext>(options => options.UseNpgsql(configuration.GetConnectionString("AuthorizationDB")));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITokenGenerator, TokenGenerator>();
        services.AddScoped<IPasswordManager, PasswordManager>();
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

