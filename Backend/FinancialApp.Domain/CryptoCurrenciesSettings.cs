using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancialApp.Domain
{
    [Table("CryptoCurrenciesSettings")]
    public class CryptoCurrenciesSettings
    {
        [Key]
        public int Id { get; set; }
        public string CryptoCurrencySymbol { get; set; }
        public string FiatCurrencySymbol { get; set; }
    }
}
