using PYBS.DataAccess.Abstract.TrainingDals;
using PYBS.Entity.Concrete.TrainingEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Repositories.TrainingRepositories
{
  public class EfTrainingRepository:EfGenericRepository<Training>,ITrainingDal
  {
  }
}
