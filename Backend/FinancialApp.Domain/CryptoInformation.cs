using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancialApp.Domain
{
    [Table("CryptoInformation")]
    public class CryptoInformation
    {
        [Key]
        public int Id { get; set; }
        public string CryptoName { get; set; }
        public double CryptoCurrentPrice { get; set; }
        public double CrytoDayChange { get; set; }
    }
}
