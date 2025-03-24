using AuthorizationService.Application.Interfaces;
using AuthorizationService.Infrastructure.Context;
using AuthorizationService.Infrastructure.Jwt;
using AuthorizationService.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<BaseContext>(options => options.UseNpgsql(configuration.GetConnectionString("AuthorizationDB")));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddSingleton<ITokenGenerator, TokenGenerator>();

        return services;
    }
}


