using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data {
    public class DataContext(DbContextOptions options) : DbContext(options) {

        public DbSet<Students> StudentsDetail { get; set; }
        public DbSet<Wardens> WardensDetail { get; set; }
        public DbSet<Guards> GuardsDetail { get; set; }
        public DbSet<HistoryOfOutings> OutingHistory { get; set; }
        public DbSet<RequestForOutings> OutingRequest { get; set; }
        
        
    }
}
