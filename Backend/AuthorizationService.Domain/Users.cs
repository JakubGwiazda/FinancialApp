using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizationService.Domain
{
    [Table("Users")]
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? RefreshTokenExpirationDate { get; set; }
    }
}
