using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Abstract;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.DataAccess.Concrete.EntityFrameworkCore.Repositories
{
    public class EfLeaveRequestRepository : EfGenericRepository<LeaveRequest>, ILeaveRequestDal
    {
        public async Task<List<LeaveRequest>> GetAllWithReferences()
        {
            using var context = new PYBSContext();
            return await context.LeaveRequests.Join(context.AppUsers, lr => lr.UserId, au => au.Id, (request, user) => new
            {
                request,
                user
            }).Join(context.LeaveTypes, two => two.request.LeaveTypeId, lt => lt.Id, (two, type) => new
            {
                request = two.request,
                user = two.user,
                type = type
            }).Join(context.LeaveStatuses, three => three.request.LeaveStatusId, ls => ls.Id, (three, status) => new
            {
                request = three.request,
                user = three.user,
                type = three.type,
                status = status
            }).Select(x => new LeaveRequest
            {
                Id = x.request.Id,
                UserId=x.user.Id,
                AppUser=x.user,
                LeaveStatusId=x.status.Id,
                LeaveStatus = x.status,
                LeaveTypeId=x.type.Id,
                LeaveType=x.type,
                LeaveStartDate=x.request.LeaveStartDate,
                LeaveFinishDate=x.request.LeaveFinishDate
            }).ToListAsync();
        }
        public async Task<List<LeaveRequest>> GetAllWithReferencesByUserId(int id)
        {
            using var context = new PYBSContext();
            return await context.LeaveRequests.Join(context.AppUsers, lr => lr.UserId, au => au.Id, (request, user) => new
            {
                request,
                user
            }).Where(x=>x.user.Id==id).Join(context.LeaveTypes, two => two.request.LeaveTypeId, lt => lt.Id, (two, type) => new
            {
                request = two.request,
                user = two.user,
                type = type
            }).Join(context.LeaveStatuses, three => three.request.LeaveStatusId, ls => ls.Id, (three, status) => new
            {
                request = three.request,
                user = three.user,
                type = three.type,
                status = status
            }).Where(x=>x.user.Id==id).Select(x => new LeaveRequest
            {
                Id = x.request.Id,
                UserId = x.user.Id,
                AppUser = x.user,
                LeaveStatusId = x.status.Id,
                LeaveStatus = x.status,
                LeaveTypeId = x.type.Id,
                LeaveType = x.type,
                LeaveStartDate = x.request.LeaveStartDate,
                LeaveFinishDate = x.request.LeaveFinishDate
            }).ToListAsync();
        }
        public async Task<LeaveStatus> GetLeaveStatusByName(string name)
        {
            using var context =new PYBSContext();
            return await context.LeaveStatuses.FirstOrDefaultAsync(x => x.Name == name);
        }
    }
}
