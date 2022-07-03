using Microsoft.EntityFrameworkCore;
using PlaneSpotterAPI.Model;

namespace PlaneSpotterAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<PlaneSpotter> PlaneSpotters => Set<PlaneSpotter>();
    }
}
