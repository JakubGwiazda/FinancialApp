# Pobierz bazowy obraz ASP.NET Core Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Pobierz SDK i zbuduj aplikacj�
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Kopiowanie pliku projektu i przywr�cenie zale�no�ci
COPY AuthorizationService/AuthorizationService.csproj AuthorizationService/
COPY AuthorizationService.Application/AuthorizationService.Application.csproj AuthorizationService.Application/
COPY AuthorizationService.Domain/AuthorizationService.Domain.csproj AuthorizationService.Domain/
COPY AuthorizationService.Infrastructure/AuthorizationService.Infrastructure.csproj AuthorizationService.Infrastructure/

RUN dotnet restore "AuthorizationService/AuthorizationService.csproj"

# Kopiowanie kodu �r�d�owego i budowanie aplikacji
COPY . .
WORKDIR "/src/AuthorizationService"
RUN dotnet publish -c Release -o /app/publish

# Tworzenie ko�cowego obrazu
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AuthorizationService.dll"]

ENV ASPNETCORE_ENVIRONMENT=Docker
ENV ASPNETCORE_URLS=http://+:5233
EXPOSE 5233