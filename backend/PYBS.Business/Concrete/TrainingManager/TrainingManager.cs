using PYBS.Business.Abstract.TrainingService;
using PYBS.DataAccess.Abstract;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Business.Concrete.TrainingManager
{
    public class TrainingManager:GenericManager<Training>,ITrainingService
    {
        private readonly IGenericDal<Training> _genericDal;
        public TrainingManager(IGenericDal<Training> genericDal) : base(genericDal)
        {
            _genericDal = genericDal;
        }
    }
}
