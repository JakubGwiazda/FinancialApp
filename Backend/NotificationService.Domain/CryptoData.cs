using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationService.Domain
{
    [Table("CryptoData")]
    public class CryptoData
    {
        [Key]
        public int Id { get; set; }
        public int TrackedCryptocurrencyId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double? PriceChange { get; set; }
        public DateTime CreateDate { get; set; }

        [ForeignKey(nameof(TrackedCryptocurrencyId))]
        public virtual TrackedCryptocurrencies TrackedCryptocurrency { get; set; }
    }
}
