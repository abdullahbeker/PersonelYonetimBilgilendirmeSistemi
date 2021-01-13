using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PYBS.Business.Abstract;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.LeaveDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly IMapper _mapper;
        private PYBSContext context = new PYBSContext();
        public LeaveController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddLeave(LeaveRequestAddDto model)
        {
            try
            {
                var leave = _mapper.Map<LeaveRequest>(model);
                leave.LeaveStatusId = 1;
                context.LeaveRequests.Add(leave);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllLeaves()
        {
            List<LeaveRequstViewDto> data = new List<LeaveRequstViewDto>();
            var leaveRequestes = await context.LeaveRequests
                .Include(lr => lr.LeaveType)
                .Include(lr => lr.AppUser)
                .Include(lr => lr.LeaveStatus)
                .ToListAsync();
            foreach (var leave in leaveRequestes)
            {
                var model = new LeaveRequstViewDto
                {
                    RequestId = leave.Id,
                    UserId = leave.AppUser.Id,
                    FullName = leave.AppUser.Name + " " + leave.AppUser.Surname,
                    Status = leave.LeaveStatus.Name,
                    CreatedAt = leave.CreatedAt,
                    IsPaid = leave.LeaveType.IsPaid,
                    LeaveFinishDate = leave.LeaveFinishDate,
                    LeaveStartDate = leave.LeaveStartDate,
                    LeaveTypeName = leave.LeaveType.LeaveName
                };
                data.Add(model);
            }
            return Ok(data);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetLeave(int id)
        {
            var leaveRequest = await context.LeaveRequests
                .Include(lr => lr.LeaveType)
                .Include(lr => lr.AppUser)
                .Include(lr => lr.LeaveStatus)
                .FirstOrDefaultAsync(x => x.Id == id);

            var leave = new LeaveRequstViewDto
            {
                RequestId = leaveRequest.Id,
                UserId = leaveRequest.AppUser.Id,
                FullName = leaveRequest.AppUser.Name + " " + leaveRequest.AppUser.Surname,
                Status = leaveRequest.LeaveStatus.Name,
                CreatedAt = leaveRequest.CreatedAt,
                IsPaid = leaveRequest.LeaveType.IsPaid,
                LeaveFinishDate = leaveRequest.LeaveFinishDate,
                LeaveStartDate = leaveRequest.LeaveStartDate,
                LeaveTypeName = leaveRequest.LeaveType.LeaveName
            };
            return Ok(leave);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllLeavesByPersonnelId(int personnelId)
        {
            List<LeaveRequstViewDto> data = new List<LeaveRequstViewDto>();
            var leaveRequestes = await context.LeaveRequests
                .Include(lr => lr.LeaveType)
                .Include(lr => lr.AppUser)
                .Include(lr => lr.LeaveStatus)
                .Where(x => x.UserId==personnelId)
                .OrderByDescending(x=>x.CreatedAt)
                .ToListAsync(); ;

            foreach (var leave in leaveRequestes)
            {
                var model = new LeaveRequstViewDto
                {
                    RequestId = leave.Id,
                    UserId = leave.AppUser.Id,
                    FullName = leave.AppUser.Name + " " + leave.AppUser.Surname,
                    Status = leave.LeaveStatus.Name,
                    CreatedAt = leave.CreatedAt,
                    IsPaid = leave.LeaveType.IsPaid,
                    LeaveFinishDate = leave.LeaveFinishDate,
                    LeaveStartDate = leave.LeaveStartDate,
                    LeaveTypeName = leave.LeaveType.LeaveName
                };
                data.Add(model);
            }
            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> LeaveStatus([FromBody] ApprovalLeaveDto data)
        {
            try
            {
                var leave = await context.LeaveRequests.FirstOrDefaultAsync(x => x.Id == data.leaveId);
                if (leave == null) BadRequest();
                leave.UpdatedAt = DateTime.Now;
                leave.LeaveStatusId = data.statusId;
                await context.SaveChangesAsync();
                return Ok(leave);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> LeaveApproval(LeaveApprovalDto leaveApprovalDto)
        {
            try
            {
                var leave = await context.LeaveRequests.FirstOrDefaultAsync(x => x.Id == leaveApprovalDto.LeaveRequestId);
                if (leave == null)
                {
                    return BadRequest();
                }
                leave.LeaveStatusId = leaveApprovalDto.LeaveStatusId;
                context.LeaveRequests.Update(leave);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }

}
