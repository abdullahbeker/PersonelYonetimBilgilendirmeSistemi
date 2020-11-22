using PYBS.Business.Abstract;
using PYBS.DataAccess.Abstract;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.Business.Concrete
{
    public class LeaveRequestManager : GenericManager<LeaveRequest>, ILeaveRequestService
    {
        private readonly IGenericDal<LeaveRequest> _genericDal;
        private readonly ILeaveRequestDal _leaveRequestDal;
        public LeaveRequestManager(IGenericDal<LeaveRequest> genericDal, ILeaveRequestDal leaveRequestDal) : base(genericDal)
        {
            _leaveRequestDal = leaveRequestDal;
            _genericDal = genericDal;
        }

        public async Task ApproveRequest(int id)
        {
            var approveStatus = await _leaveRequestDal.GetLeaveStatusByName("Approved");
            var approvedLeaveRequest =await _leaveRequestDal.GetByFilter(x => x.Id == id);
            approvedLeaveRequest.LeaveStatusId = approveStatus.Id;
            await _leaveRequestDal.Update(approvedLeaveRequest);
        }

        public async Task<List<LeaveRequest>> GetAllByUserId(int id)
        {
            return await _leaveRequestDal.GetAllByFilter(x => x.UserId == id);
        }

        public async Task<List<LeaveRequest>> GetAllWithReferences()
        {
            return await _leaveRequestDal.GetAllWithReferences();
        }

        public async Task<List<LeaveRequest>> GetAllWithReferencesByUserId(int id)
        {
            return await _leaveRequestDal.GetAllWithReferencesByUserId(id);
        }

        public async Task RejectRequest(int id)
        {
            var rejectedStatus = await _leaveRequestDal.GetLeaveStatusByName("Rejected");
            var rejectedLeaveRequest = await _leaveRequestDal.GetByFilter(x => x.Id == id);
            rejectedLeaveRequest.LeaveStatusId = rejectedStatus.Id;
            await _leaveRequestDal.Update(rejectedLeaveRequest);
        }
         
    }
}
