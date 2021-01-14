using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete.TrainingEntities
{
    public class Training : ITable
    {
        public enum TrainingStatus
        {
            NOT_STARTED,
            CONTINUES,
            DONE
        }
        public int Id { get; set; }
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
