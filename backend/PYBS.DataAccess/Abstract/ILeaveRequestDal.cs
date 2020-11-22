using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.DataAccess.Abstract
{
  public interface ILeaveRequestDal : IGenericDal<LeaveRequest>
  {
        Task<LeaveStatus> GetLeaveStatusByName(string name);
        Task<List<LeaveRequest>> GetAllWithReferences();
        Task<List<LeaveRequest>> GetAllWithReferencesByUserId(int id);
    }
}
