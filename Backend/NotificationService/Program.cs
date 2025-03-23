using Microsoft.AspNetCore.Builder.Extensions;
using Microsoft.OpenApi.Writers;
using NotificationService.Infrastructure.Services.RabbitMQ;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Threading;

var builder = WebApplication.CreateBuilder(args);

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Local";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true);


builder.Services.AddInfrastructureServices(builder.Configuration);

/*var baseUrl = builder.Configuration["ApiSettings:BaseUrl"];

builder.Services.AddHttpClient("ApiClient", client =>
{
    client.BaseAddress = new Uri(baseUrl);
});*/

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    var filePath = Path.Combine(app.Environment.ContentRootPath, "api", "notification_service_api.json");
    var swaggerProvider = app.Services.GetRequiredService<ISwaggerProvider>();
    var swagger = swaggerProvider.GetSwagger("v1");

    using (var writer = new StreamWriter(filePath))
    {
        swagger.SerializeAsV3(new OpenApiJsonWriter(writer));
    }
}


app.UseAuthorization();

app.MapControllers();

app.Run();
