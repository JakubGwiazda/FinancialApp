#!/bin/sh

# Czekaj na gotowo�� bazy danych
until dotnet ef database update --project FinancialApp.Infrastructure/FinancialApp.Infrastructure.csproj; do
  echo "Czekam na baz� danych..."
  sleep 5
done

# Uruchom aplikacj� po wykonaniu migracji
dotnet FinancialApp.dll
