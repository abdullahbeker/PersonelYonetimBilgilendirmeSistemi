using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.Business.Abstract
{
  public interface ILeaveRequestService : IGenericService<LeaveRequest>
  {
        Task ApproveRequest(int id);
        Task RejectRequest(int id);
        Task<List<LeaveRequest>> GetAllByUserId(int id);
        Task<List<LeaveRequest>> GetAllWithReferences();
        Task<List<LeaveRequest>> GetAllWithReferencesByUserId(int id);
    }
}
