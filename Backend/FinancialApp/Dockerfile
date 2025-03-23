# Pobierz bazowy obraz ASP.NET Core Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Pobierz SDK i zbuduj aplikacjê
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Kopiowanie pliku projektu i przywrócenie zale¿noœci
COPY FinancialApp/FinancialApp.csproj FinancialApp/
COPY FinancialApp.Application/FinancialApp.Application.csproj FinancialApp.Application/
COPY FinancialApp.Domain/FinancialApp.Domain.csproj FinancialApp.Domain/
COPY FinancialApp.Infrastructure/FinancialApp.Infrastructure.csproj FinancialApp.Infrastructure/

RUN dotnet restore "FinancialApp/FinancialApp.csproj"

# Kopiowanie kodu Ÿród³owego i budowanie aplikacji
COPY . .
WORKDIR "/src/FinancialApp"
RUN dotnet publish -c Release -o /app/publish

# Tworzenie koñcowego obrazu
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "FinancialApp.dll"]

ENV ASPNETCORE_ENVIRONMENT=Docker
ENV ASPNETCORE_URLS=http://+:5113
EXPOSE 5113