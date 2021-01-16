using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.TrainingDtos
{
    public class TrainingPersonnelAdd
    {
        public int TrainingId { get; set; }
        public IEnumerable<int> PersonnelList { get; set; }
    }
}
