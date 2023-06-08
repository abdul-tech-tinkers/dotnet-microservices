using Microsoft.EntityFrameworkCore;
using MoviesAPI.Model;

namespace MoviesAPI.Data
{
    public class MoviesDbContext : DbContext
    {
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
        {

        }

        public DbSet<Movie> Movies { get; set; }
    }
}
