using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
  public class TrainingStatus:ITable
  {
    public int Id { get; set; }
    public int Name { get; set; }
  }
}
