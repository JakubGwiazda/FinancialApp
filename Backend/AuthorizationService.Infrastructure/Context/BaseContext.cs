using AuthorizationService.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AuthorizationService.Infrastructure.Context
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

        public DbSet<Users> AppSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
        }
    }
}
