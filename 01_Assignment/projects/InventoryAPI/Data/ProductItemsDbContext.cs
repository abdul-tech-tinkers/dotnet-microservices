using InventoryAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace InventoryAPI.Data
{
    public class ProductItemsDbContext : DbContext
    {
        public ProductItemsDbContext(DbContextOptions<ProductItemsDbContext> options) : base(options)
        {

        }

        public DbSet<ProductItem> ProductItems { get; set; }
    }
}
