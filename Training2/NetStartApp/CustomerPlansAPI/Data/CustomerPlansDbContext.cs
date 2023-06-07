using CustomerPlansAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace CustomerPlansAPI.Context
{
    public class CustomerPlansDbContext: DbContext
    {
        public CustomerPlansDbContext(DbContextOptions<CustomerPlansDbContext> options):base(options) 
        {

        }

        public DbSet<Plan> Plans { get; set; }
    }
}
