﻿using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Commands;
using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Xml.Linq;

namespace FinancialApp.Infrastructure.Repositories
{
    internal class CryptoCurrenciesSettingsRepository : ICryptoCurrenciesSettingsRepository
    {
        private BaseContext _baseContext { get; }
        public CryptoCurrenciesSettingsRepository(BaseContext baseContext)
        {
            _baseContext = baseContext;
        }

        public async Task<Result> AddNewRecord<T>(T data) where T : class
        {
            if (data == null)
            {
                return Result.Fail("Cannot add a null entity.");
            }

            try
            {
                await _baseContext.AddAsync(data);
                await _baseContext.SaveChangesAsync();
                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail($"Error adding record: {ex.Message}");
            }
        }

        public async Task DeleteRecord<T>(T data) where T : class
        {
            try
            {
                _baseContext.Set<T>().Remove(data);
                await _baseContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<T>> GetAllRecords<T>(Expression<Func<T, bool>> predicate = null) where T : class
        {
            IQueryable<T> query = _baseContext.Set<T>();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return await query.ToListAsync();
        }

        public async Task<T> GetRecord<T>(int id) where T : class
        {
            return await _baseContext.Set<T>().FindAsync(id);
        }

        public async Task<Result> UpdateRecord(UpdateTrackedPairCmd request,  TrackedCryptocurrencies data)
        {
            try
            {
                    var existingRecord = await _baseContext.CryptoCurrenciesSettings.FindAsync(data.Id);
                    if (existingRecord == null)
                    {
                        return Result.Fail("Entity not found");
                    }

                    existingRecord.CollectData = request.CollectData;


                await _baseContext.SaveChangesAsync();
                    return Result.Ok();                
            }
            catch (Exception)
            {
                return Result.Fail("Update entity was not successful");
            }
        }

        public async Task UpdateRecord(TrackedCryptocurrencies data)
        {
            await _baseContext.SaveChangesAsync();
        }
    }
}
