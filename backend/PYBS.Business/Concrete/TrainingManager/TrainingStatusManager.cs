using PYBS.Business.Abstract.TrainingService;
using PYBS.DataAccess.Abstract.TrainingDals;
using PYBS.Entity.Concrete.TrainingEntities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.Business.Concrete.TrainingManager
{
    public class TrainingStatusManager : ITrainingStatusService
    {
        private ITrainingStatusDal _trainingStatusDal;

        public TrainingStatusManager(ITrainingStatusDal trainingStatusDal)
        {
            _trainingStatusDal = trainingStatusDal;
        }

        public async Task Add(TrainingStatus entity)
        {
            await _trainingStatusDal.Add(entity);
        }

        public async Task Delete(TrainingStatus entity)
        {
            await _trainingStatusDal.Delete(entity);
        }

        public async Task<List<TrainingStatus>> GetAll()
        {
            return await _trainingStatusDal.GetAll();
        }

        public async Task<TrainingStatus> GetById(int id)
        {
            return await _trainingStatusDal.GetById(id);
        }

        public async Task Update(TrainingStatus entity)
        {
            await _trainingStatusDal.Update(entity);
        }
    }
}
