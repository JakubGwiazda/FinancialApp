using CryptoInfo.Infrastructure.Context;
using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;

namespace FinancialApp.Infrastructure.Services
{
    internal class LogService : ILogService
    {
        private readonly BaseContext _context;
        public LogService(BaseContext baseContext)
        {
            _context = baseContext;
        }
        public void LogError(string message)
        {
            _context.OperationLogs.Add(new OperationLogs()
            {
                LogType = OperationLogType.Error,
                Message = message,
                Created = DateTime.UtcNow
            });

            _context.SaveChanges();
        }

        public void LogInfo(string message)
        {
            _context.OperationLogs.Add(new OperationLogs()
            {
                LogType = OperationLogType.Info,
                Message = message,
                Created = DateTime.UtcNow
            });

            _context.SaveChanges();
        }

        public void LogWarning(string message)
        {
            _context.OperationLogs.Add(new OperationLogs()
            {
                LogType = OperationLogType.Warning,
                Message = message,
                Created = DateTime.UtcNow
            });

            _context.SaveChanges();
        }
    }
}
