using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.TrainingDtos
{
    public class TrainingPersonnelAdd
    {
        public int TraininId { get; set; }
        public List<int> PersonnelList { get; set; }
    }
}
