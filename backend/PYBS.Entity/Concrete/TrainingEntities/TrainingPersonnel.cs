using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PYBS.Entity.Concrete.TrainingEntities
{
    public class TrainingPersonnel : ITable
    {
        public int TrainingId { get; set; }
        public Training Training { get; set; }
        public int PersonnelId { get; set; }
        [ForeignKey("PersonnelId")]
        public AppUser AppUser { get; set; }
    }
}
