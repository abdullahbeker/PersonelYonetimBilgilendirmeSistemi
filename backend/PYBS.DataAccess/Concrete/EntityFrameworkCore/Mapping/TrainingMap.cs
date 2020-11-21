using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping
{
    public class TrainingMap : IEntityTypeConfiguration<Training>
    {
        public void Configure(EntityTypeBuilder<Training> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.TrainingName).HasMaxLength(75).IsRequired();
            builder.Property(x => x.StartDate).IsRequired();
            builder.Property(x => x.FinishDate).IsRequired();
            builder.Property(x => x.Detail).HasMaxLength(200).IsRequired();
            builder.Property(x => x.Location).HasMaxLength(50).IsRequired();
            builder.Property(x => x.EducatingFirm).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Instructor).HasMaxLength(50).IsRequired();
        }
    }

}
