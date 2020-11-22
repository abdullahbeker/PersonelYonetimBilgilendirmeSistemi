using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping
{
  public class LeaveRequestMap : IEntityTypeConfiguration<LeaveRequest>
  {
    public void Configure(EntityTypeBuilder<LeaveRequest> builder)
    {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id).UseIdentityColumn();

      builder.HasOne(x => x.AppUser).WithMany(x => x.LeaveRequests).HasForeignKey(x => x.UserId);
      builder.HasOne(x => x.LeaveType).WithMany(x => x.LeaveRequests).HasForeignKey(x => x.LeaveTypeId);
      builder.HasOne(x => x.LeaveStatus).WithMany(x => x.LeaveRequests).HasForeignKey(x => x.LeaveStatusId);
    }
  }
}
