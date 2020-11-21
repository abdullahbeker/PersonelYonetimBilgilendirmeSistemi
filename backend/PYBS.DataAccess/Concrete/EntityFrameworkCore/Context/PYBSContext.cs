using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping;
using PYBS.Entity.Concrete;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Context
{
    public class PYBSContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=localhost;database=PYBSDb;integrated security=true");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AppUserMap());
            modelBuilder.ApplyConfiguration(new AppRoleMap());
            modelBuilder.ApplyConfiguration(new AppUserRoleMap());
            modelBuilder.ApplyConfiguration(new TrainingMap());
            modelBuilder.ApplyConfiguration(new TrainingPersonnelMap());
        }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<AppUserRole> AppUserRoles { get; set; }
        public DbSet<BloodType> BloodTypes { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<MaritalStatus> MaritalStatuses { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<TrainingPersonnel> TrainingPersonnels { get; set; }
        public DbSet<TrainingStatus> TrainingStatuses { get; set; }


    }
}
