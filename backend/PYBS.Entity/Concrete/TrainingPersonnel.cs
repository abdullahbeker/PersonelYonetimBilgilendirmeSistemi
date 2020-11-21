using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
  public class TrainingPersonnel:ITable
  {
    public int TrainingId { get; set; }
    public int PersonnelId { get; set; }
    public int StatusId { get; set; }
  }
}
