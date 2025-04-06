#!/bin/sh

# Czekaj na gotowoœæ bazy danych
until dotnet ef database update --project FinancialApp.Infrastructure/FinancialApp.Infrastructure.csproj; do
  echo "Czekam na bazê danych..."
  sleep 5
done

# Uruchom aplikacjê po wykonaniu migracji
dotnet FinancialApp.dll
