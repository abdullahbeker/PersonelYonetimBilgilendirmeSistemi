using System;
using System.Collections.Generic;
using System.Text;
using static PYBS.Entity.Concrete.TrainingEntities.Training;

namespace PYBS.Entity.Dtos.TrainingDtos
{
    public class TrainingAddDto
    {
        public string TrainingName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Detail { get; set; }
        public string Location { get; set; }
        public string EducatingFirm { get; set; }
        public string Instructor { get; set; }
        public TrainingStatus Status { get; set; }
    }
}
