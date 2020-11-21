using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
    public class Training : ITable
    {
        public int Id { get; set; }
        public string TrainingName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Detail { get; set; }
        public string Location { get; set; }
        public string EducatingFirm { get; set; }
        public string Instructor { get; set; }
    }
}
