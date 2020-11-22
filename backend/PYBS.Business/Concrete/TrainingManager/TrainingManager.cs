using PYBS.Business.Abstract.TrainingService;
using PYBS.DataAccess.Abstract.TrainingDals;
using PYBS.Entity.Concrete.TrainingEntities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.Business.Concrete.TrainingManager
{
    public class TrainingManager : ITrainingService
    {
        private ITrainingDal _trainingDal;

        public TrainingManager(ITrainingDal trainingDal)
        {
            _trainingDal = trainingDal;
        }

        public async Task Add(Training entity)
        {
           await _trainingDal.Add(entity);
        }

        public async Task Delete(Training entity)
        {
            await _trainingDal.Delete(entity);
        }

        public async Task<List<Training>> GetAll()
        {
            return await _trainingDal.GetAll();
        }

        public async Task<Training> GetById(int id)
        {
            return await _trainingDal.GetById(id);
        }

        public async Task Update(Training entity)
        {
            await _trainingDal.Update(entity);
        }
    }
}
