using PYBS.DataAccess.Abstract;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Repositories
{
  public class EfTrainingStatusRepository:EfGenericRepository<TrainingStatus>,ITrainingStatusDal
  {
  }
}
