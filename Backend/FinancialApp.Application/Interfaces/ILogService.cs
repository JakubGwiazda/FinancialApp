namespace FinancialApp.Application.Interfaces
{
    public interface ILogService
    {
        void LogWarning(string message);
        void LogError(string message);
        void LogInfo(string message);
    }
}
