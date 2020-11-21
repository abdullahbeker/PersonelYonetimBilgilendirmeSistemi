using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

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
            modelBuilder.ApplyConfiguration(new BloodTypeMap());
            modelBuilder.ApplyConfiguration(new DistrictMap());
            modelBuilder.ApplyConfiguration(new GenderMap());
            modelBuilder.ApplyConfiguration(new MaritalStatusMap());
            modelBuilder.ApplyConfiguration(new ProvinceMap());
        }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<AppUserRole> AppUserRoles { get; set; }
        public DbSet<BloodType> BloodTypes { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<MaritalStatus> MaritalStatuses { get; set; }
        public DbSet<Province> Provinces { get; set; }


    }
}
