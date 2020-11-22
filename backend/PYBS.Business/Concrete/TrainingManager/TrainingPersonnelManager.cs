using PYBS.Business.Abstract.TrainingService;
using PYBS.DataAccess.Abstract;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Business.Concrete.TrainingManager
{
    public class TrainingPersonnelManager : GenericManager<TrainingPersonnel>, ITrainingPersonnelService
    {
        private readonly IGenericDal<TrainingPersonnel> _genericDal;
        public TrainingPersonnelManager(IGenericDal<TrainingPersonnel> genericDal) : base(genericDal)
        {
            _genericDal = genericDal;
        }
    }
}
