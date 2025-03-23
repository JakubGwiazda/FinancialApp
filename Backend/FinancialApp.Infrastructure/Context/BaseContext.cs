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

        public DbSet<CryptoData> CryptoData { get; set; }
        public DbSet<AppSettings> AppSettings { get; set; }
        public DbSet<TrackedCryptocurrencies> TrackedCryptocurrencies { get; set; }
        public DbSet<RegisteredDevices> RegisteredDevices { get; set; }
               

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppSettings>()
                .Property(e => e.ValueType)
                .HasConversion<string>();
        }

/*        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connectionString = _configuration.GetConnectionString("FinancialDatabase");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("The ConnectionString property has not been initialized.");
            }

            options.UseNpgsql(connectionString);
        }*/
    }
}
