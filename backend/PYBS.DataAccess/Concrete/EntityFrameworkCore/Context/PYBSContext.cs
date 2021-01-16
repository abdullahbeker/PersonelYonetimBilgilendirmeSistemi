using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping.TrainingMaps;
using PYBS.Entity.Concrete;
using PYBS.Entity.Concrete.TrainingEntities;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Context
{
    public class PYBSContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("server=localhost;database=PYBSDb;integrated security=true");
            //Azure
            optionsBuilder.UseSqlServer("server=erza-server.database.windows.net;database=erza;User Id=erza;Password=7URgfuyFVAN4ZEzR;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AppUserMap());
            modelBuilder.ApplyConfiguration(new AppRoleMap());
            modelBuilder.ApplyConfiguration(new AppUserRoleMap());
            modelBuilder.ApplyConfiguration(new TrainingMap());
            modelBuilder.ApplyConfiguration(new TrainingPersonnelMap());
            modelBuilder.ApplyConfiguration(new BloodTypeMap());
            modelBuilder.ApplyConfiguration(new DistrictMap());
            modelBuilder.ApplyConfiguration(new GenderMap());
            modelBuilder.ApplyConfiguration(new MaritalStatusMap());
            modelBuilder.ApplyConfiguration(new ProvinceMap());
            modelBuilder.ApplyConfiguration(new AssetMap());
        }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<AppUserRole> AppUserRoles { get; set; }
        public DbSet<BloodType> BloodTypes { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<MaritalStatus> MaritalStatuses { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<LeaveStatus> LeaveStatuses { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<TrainingPersonnel> TrainingPersonnels { get; set; }
        public DbSet<Asset>Assets{ get; set; }

    }
}
