using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Application.Interfaces
{
    public interface IBaseRepositoryOperation
    {
        Task<Result> AddNewRecord<T>(T data) where T : class;
        Task DeleteRecord<T>(T data) where T : class;
        Task<List<T>> GetAllRecords<T>() where T : class;
        Task<T> GetRecord<T>(int id) where T : class;

    }
}
