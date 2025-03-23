FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY NotificationService/NotificationService.csproj NotificationService/
COPY NotificationService.Application/NotificationService.Application.csproj NotificationService.Application/
COPY NotificationService.Domain/NotificationService.Domain.csproj NotificationService.Domain/
COPY NotificationService.Infrastructure/NotificationService.Infrastructure.csproj NotificationService.Infrastructure/

RUN dotnet restore "NotificationService/NotificationService.csproj"

COPY . .
WORKDIR "/src/NotificationService"
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "NotificationService.dll"]

ENV ASPNETCORE_ENVIRONMENT=Docker
ENV ASPNETCORE_URLS=http://+:5102
EXPOSE 5102
