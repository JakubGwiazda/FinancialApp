using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Domain
{
    public enum OperationLogType
    {
        Info = 1,
        Warning = 2,
        Error = 3,
    }

    [Table("OperationLogs")]
    public class OperationLogs
    {
        [Key]
        public int Id { get; set; }
        public string Message { get; set; }
        public OperationLogType LogType {get;set;}
        public DateTime Created { get; set; }
    }
}
