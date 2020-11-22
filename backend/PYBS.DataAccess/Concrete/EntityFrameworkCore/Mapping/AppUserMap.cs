using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping
{
    public class AppUserMap : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.Username).HasMaxLength(100).IsRequired();
            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.Password).HasMaxLength(100).IsRequired();
            builder.Property(x => x.BCWC).HasMaxLength(100);
            builder.Property(x => x.BonusCode).HasMaxLength(100);
            builder.Property(x => x.Department).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(500);
            builder.Property(x => x.Division).HasMaxLength(100);
            builder.Property(x => x.Duty).HasMaxLength(100);
            builder.Property(x => x.EmployerCompany).HasMaxLength(100);
            builder.Property(x => x.Graduation).HasMaxLength(100);
            builder.Property(x => x.GraduationDepartment).HasMaxLength(100);
            builder.Property(x => x.IdentityNumber).HasMaxLength(11);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.PersonnelNumber).HasMaxLength(100);
            builder.Property(x => x.PhoneNumber).HasMaxLength(11);
            builder.Property(x => x.Status).HasMaxLength(100);

            builder.HasMany(x => x.AppUserRoles).WithOne(x => x.AppUser).HasForeignKey(x => x.AppUserId).OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.BloodType).WithMany(x => x.AppUsers).HasForeignKey(x => x.BloodTypeId); 

            builder.HasOne(x => x.Gender).WithMany(x => x.AppUsers).HasForeignKey(x => x.GenderId);

            builder.HasOne(x => x.MaritalStatus).WithMany(x => x.AppUsers).HasForeignKey(x => x.MaritalStatusId);

            builder.HasOne(x => x.Province).WithMany(x => x.AppUsers).HasForeignKey(x=>x.ProvinceId).OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.District).WithMany(x => x.AppUsers).HasForeignKey(x => x.DistrictId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
