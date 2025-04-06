using FinancialApp.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CryptoInfo.Infrastructure.Context
{
    public class BaseContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public BaseContext() { }
        public BaseContext(DbContextOptions<BaseContext> options) : base(options)
        {
        }

        public BaseContext(DbContextOptions<BaseContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<CryptoData> CryptoData { get; set; }
        public DbSet<AppSettings> AppSettings { get; set; }
        public DbSet<TrackedCryptocurrencies> TrackedCryptocurrencies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppSettings>()
                .Property(e => e.ValueType)
                .HasConversion<string>();

            modelBuilder.Entity<CryptoData>()
                .HasIndex(c => new { c.TrackedCryptocurrencyId, c.CreateDate })
                .HasDatabaseName("IX_CryptoData_TrackedCryptoId_CreateDate");

            modelBuilder.Entity<CryptoData>()
                 .HasIndex(c => new { c.CreateDate })
                 .HasDatabaseName("IX_CryptoData_CreateDate");
        }
    }
}
