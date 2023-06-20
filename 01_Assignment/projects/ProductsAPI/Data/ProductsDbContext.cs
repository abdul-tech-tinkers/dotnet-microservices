using Microsoft.EntityFrameworkCore;
using ProductsAPI.Model;

namespace ProductsAPI.Data
{
    public class ProductsDbContext:DbContext
    {
        public ProductsDbContext(DbContextOptions<ProductsDbContext> options):base(options)
        {
            
        }

        public DbSet<Product> Products { get; set; }
    }
}
