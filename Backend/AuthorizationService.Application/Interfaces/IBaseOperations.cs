﻿using FluentResults;
using System.Linq.Expressions;

namespace AuthorizationService.Application.Interfaces
{
    public interface IBaseOperations
    {
        Task<Result> AddNewRecord<T>(T data) where T : class;
        Task DeleteRecord<T>(T data) where T : class;
        Task<List<T>> GetAllRecords<T>(Expression<Func<T, bool>> predicate = null) where T : class;
        Task<T> GetRecord<T>(Expression<Func<T, bool>> predicate = null) where T : class;
        Task<T> GetRecordById<T>(int id) where T : class;
        Task SaveChangesAsync();
    }
}
