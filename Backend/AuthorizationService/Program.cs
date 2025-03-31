using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Writers;
using Serilog;
using Swashbuckle.AspNetCore.Swagger;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true);


builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApplicationServices();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                
                // Logowanie b³êdu autentykacji
                Log.Warning("Authorization Header: " +context.Request.Headers.Authorization);
                Log.Warning("Authentication failed: {Exception}", context.Exception.Message);

                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                // Logowanie braku tokenu w nag³ówkach
                Log.Warning("Authorization Header: " + context.Request.Headers.Authorization);

                Log.Warning("Authentication challenge triggered.");
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                // Logowanie sukcesu walidacji tokenu
                Log.Warning("Authorization Header: " + context.Request.Headers.Authorization);

                Log.Information("Token validated successfully.");
                return Task.CompletedTask;
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
               .AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    var filePath = Path.Combine(app.Environment.ContentRootPath, "api", "authorization_api.json");
    var swaggerProvider = app.Services.GetRequiredService<ISwaggerProvider>();
    var swagger = swaggerProvider.GetSwagger("v1");

    using (var writer = new StreamWriter(filePath))
    {
        swagger.SerializeAsV3(new OpenApiJsonWriter(writer));
    }
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.All
});

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
