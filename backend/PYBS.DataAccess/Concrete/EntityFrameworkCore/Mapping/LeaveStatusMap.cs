using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping
{
  public class LeaveStatusMap : IEntityTypeConfiguration<LeaveStatus>
  {
    public void Configure(EntityTypeBuilder<LeaveStatus> builder)
    {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id).UseIdentityColumn();

      builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
    }
  }
}
