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
            _configuration= configuration;
        }

        public DbSet<TrackedCryptocurrencies> CryptoInformation { get; set; }
        public DbSet<AppSettings> AppSettings { get; set; }
        public DbSet<TrackedCryptocurrencies> CryptoCurrenciesSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppSettings>()
                .Property(e => e.ValueType)
                .HasConversion<string>();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                var connectionString = _configuration?.GetConnectionString("FinancialDatabase") ?? "Data Source=../Database/FinancialDb.db";

                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("Database connection string is missing.");
                }

                options.UseSqlite(connectionString);
            }
        }
    }
}
