using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PYBS.Entity.Concrete.TrainingEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Mapping.TrainingMaps
{
    public class TrainingPersonnelMap : IEntityTypeConfiguration<TrainingPersonnel>
    {
        public void Configure(EntityTypeBuilder<TrainingPersonnel> builder)
        {
            builder.HasNoKey();
            builder.HasIndex(x => new { x.TrainingId, x.PersonnelId }).IsUnique();
            builder.Property(x => x.StatusId).IsRequired();
        }
    }
}
