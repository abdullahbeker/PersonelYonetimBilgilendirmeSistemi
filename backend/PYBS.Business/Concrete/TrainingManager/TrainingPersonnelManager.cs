using PYBS.Business.Abstract.TrainingService;
using PYBS.DataAccess.Abstract.TrainingDals;
using PYBS.Entity.Concrete.TrainingEntities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.Business.Concrete.TrainingManager
{
    public class TrainingPersonnelManager : ITrainingPersonnelService
    {
        private ITrainingPersonnelDal _trainingPersonnelDal;

        public TrainingPersonnelManager(ITrainingPersonnelDal trainingPersonnelDal)
        {
            _trainingPersonnelDal = trainingPersonnelDal;
        }

        public async Task Add(TrainingPersonnel entity)
        {
            await _trainingPersonnelDal.Add(entity);
        }

        public async Task Delete(TrainingPersonnel entity)
        {
            await _trainingPersonnelDal.Delete(entity);
        }

        public async Task<List<TrainingPersonnel>> GetAll()
        {
            return await _trainingPersonnelDal.GetAll();
        }

        public async Task<TrainingPersonnel> GetById(int id)
        {
            return await _trainingPersonnelDal.GetById(id);
        }

        public async Task Update(TrainingPersonnel entity)
        {
            await _trainingPersonnelDal.Update(entity);
        }
    }
}
