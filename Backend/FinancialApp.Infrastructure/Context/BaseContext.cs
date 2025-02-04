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

        public DbSet<CryptoInformation> CryptoInformation { get; set; }
        public DbSet<AppSettings> AppSettings { get; set; }
        public DbSet<CryptoCurrenciesSettings> CryptoCurrenciesSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppSettings>()
                .Property(e => e.ValueType)
                .HasConversion<string>();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var basePath = AppContext.BaseDirectory;
            var databasePath = Path.Combine(basePath, "Database", "FinancialDb.db");

            //var connectionString = _configuration.GetConnectionString("FinancialDatabase");
            options.UseSqlite($"Data Source={databasePath}");
        }
    }
}
