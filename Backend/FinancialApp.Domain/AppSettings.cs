using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancialApp.Domain
{
    [Table("AppSettings")]
    public class AppSettings
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public SettingValueType ValueType { get; set; }
        public string Value { get; set; }
    }
}
