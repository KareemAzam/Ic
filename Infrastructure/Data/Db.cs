
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class Db:DbContext
    {
        public Db(DbContextOptions options) :base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
