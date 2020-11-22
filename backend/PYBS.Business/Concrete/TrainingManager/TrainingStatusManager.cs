using PYBS.Business.Abstract.TrainingService;
using PYBS.DataAccess.Abstract;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Business.Concrete.TrainingManager
{
    public class TrainingStatusManager:GenericManager<TrainingStatus>,ITrainingStatusService
    {
        private readonly IGenericDal<TrainingStatus> _genericDal;
        public TrainingStatusManager(IGenericDal<TrainingStatus> genericDal) : base(genericDal)
        {
            _genericDal = genericDal;
        }
    }
}
