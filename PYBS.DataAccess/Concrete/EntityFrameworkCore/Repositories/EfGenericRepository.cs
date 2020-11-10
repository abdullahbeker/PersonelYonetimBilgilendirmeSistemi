using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Abstract;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Repositories
{
    public class EfGenericRepository<TEntity> : IGenericDal<TEntity> where TEntity : class, ITable, new()
    {
        public async Task Add(TEntity entity)
        {
            using var context = new PYBSContext();
            context.Add(entity);
            await context.SaveChangesAsync();
        }

        public async Task Delete(TEntity entity)
        {
            using var context = new PYBSContext();
            context.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<List<TEntity>> GetAll()
        {
            using var context = new PYBSContext();
            return await context.Set<TEntity>().ToListAsync();
        }

        public async Task<List<TEntity>> GetAllByFilter(Expression<Func<TEntity, bool>> filter)
        {
            using var context = new PYBSContext();
            return await context.Set<TEntity>().Where(filter).ToListAsync();
        }

        public async Task<TEntity> GetByFilter(Expression<Func<TEntity, bool>> filter)
        {
            using var context = new PYBSContext();
            return await context.Set<TEntity>().FirstOrDefaultAsync(filter);
        }

        public async Task<TEntity> GetById(int id)
        {
            using var context = new PYBSContext();
            return await context.Set<TEntity>().FindAsync(id);
        }

        public async Task Update(TEntity entity)
        {
            using var context = new PYBSContext();
            context.Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
