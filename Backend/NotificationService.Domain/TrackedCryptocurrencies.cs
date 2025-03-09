using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationService.Domain
{
    [Table("TrackedCryptocurrencies")]
    public class TrackedCryptocurrencies
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ReferenceCurrencyName { get; set; }
        public bool CollectData { get;set; }
        public virtual ICollection<CryptoData> CryptoData { get; set; } = new List<CryptoData>();
    }
}
