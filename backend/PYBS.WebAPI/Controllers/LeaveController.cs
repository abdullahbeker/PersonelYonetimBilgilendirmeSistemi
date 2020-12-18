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

        private PYBSContext context= new PYBSContext();
        
        [HttpPost("Leave-request")]
        public async Task<IActionResult> AddLeave(LeaveRequest leave)
        {
            try
            {
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
        [HttpGet("admin/leave-request")]
        public async Task<List<LeaveRequest>> GetAllLeave()
        {
            return await context.LeaveRequests.ToListAsync();
        }
        [HttpGet("leave-request/{id}")]
        public async Task<IActionResult> GetLeave(int id)
        {
            var leave = await context.LeaveRequests.FirstOrDefaultAsync(x => x.Id == id);
            if (leave==null) BadRequest();
            return Ok(leave);
        }
        [HttpGet("leave-request-list/{personnelId}")]
        public async Task<IActionResult> GetLeaves(int personnelId)
        {
            var leave = await context.LeaveRequests.Where(x => x.UserId == personnelId).ToListAsync();
            if (leave.Count == 0) return BadRequest();
            return Ok(leave);
        }

        [HttpPost("admin/approval-leave-request")]
        public async Task<IActionResult> LeaveStatus([FromBody]ApprovalLeave data)
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
        public class ApprovalLeave
        {
            public int statusId { get; set; }
            public int leaveId { get; set; }
        }
        //private readonly ILeaveTypeService _leaveTypeService;
        //private readonly ILeaveRequestService _leaveRequestService;
        //private readonly IMapper _mapper;

        //public LeaveController(ILeaveTypeService leaveTypeService, ILeaveRequestService leaveRequestService, IMapper mapper)
        //{
        //    _mapper = mapper;
        //    _leaveRequestService = leaveRequestService;
        //    _leaveTypeService = leaveTypeService;
        //}
        //[HttpGet("[action]")]
        //public async Task<IActionResult> GetAll()
        //{
        //    var requests = await _leaveRequestService.GetAllWithReferences();
        //    List<LeaveRequestListAllDto> leaveRequestList = new List<LeaveRequestListAllDto>();
        //    foreach (var request in requests)
        //    {
        //        LeaveRequestListAllDto leaveRequest = new LeaveRequestListAllDto();
        //        leaveRequest.Id = request.Id;
        //        leaveRequest.UserId = request.UserId;
        //        leaveRequest.Name = request.AppUser.Name;
        //        leaveRequest.Surname = request.AppUser.Surname;
        //        leaveRequest.LeaveStatusName = request.LeaveStatus.Name;
        //        leaveRequest.LeaveTypeName = request.LeaveType.LeaveName;
        //        leaveRequest.LeaveStartDate = request.LeaveStartDate;
        //        leaveRequest.LeaveFinishDate = request.LeaveFinishDate;

        //        leaveRequestList.Add(leaveRequest);
        //    }
        //    return Ok(leaveRequestList);
        //}
        //[HttpGet("[action]/{id}")]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    return Ok(await _leaveRequestService.GetById(id));
        //}
        //[HttpGet("[action]/{id}")]
        //public async Task<IActionResult> GetAllByUserId(int id)
        //{
        //    var requests = await _leaveRequestService.GetAllWithReferences();
        //    LeaveRequestListWithUserDto leaveRequestListWithUser = new LeaveRequestListWithUserDto();
        //    leaveRequestListWithUser.UserId = requests[0].AppUser.Id;
        //    leaveRequestListWithUser.Name = requests[0].AppUser.Name;
        //    leaveRequestListWithUser.Surname = requests[0].AppUser.Surname;

        //    List<LeaveRequestListDto> leaveRequestList = new List<LeaveRequestListDto>();
        //    foreach (var request in requests)
        //    {
        //        LeaveRequestListDto leaveRequest = new LeaveRequestListDto();
        //        leaveRequest.Id = request.Id;
        //        leaveRequest.LeaveStatusName = request.LeaveStatus.Name;
        //        leaveRequest.LeaveTypeName = request.LeaveType.LeaveName;
        //        leaveRequest.LeaveStartDate = request.LeaveStartDate;
        //        leaveRequest.LeaveFinishDate = request.LeaveFinishDate;

        //        leaveRequestList.Add(leaveRequest);
        //    }
        //    leaveRequestListWithUser.LeaveRequestLists = leaveRequestList;
        //    return Ok(leaveRequestListWithUser);
        //}
        //[HttpPost]
        //public async Task<IActionResult> CreateType(LeaveTypeAddDto leaveTypeAddDto)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        await _leaveTypeService.Add(_mapper.Map<LeaveType>(leaveTypeAddDto));
        //        return Created("", leaveTypeAddDto);
        //    }
        //    return BadRequest();
        //}
        //[HttpPost]
        //public async Task<IActionResult> CreateRequest(LeaveRequestAddDto leaveRequestAddDto)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        await _leaveRequestService.Add(_mapper.Map<LeaveRequest>(leaveRequestAddDto));
        //        return Created("", leaveRequestAddDto);
        //    }
        //    return BadRequest();
        //}
        //[HttpPut]
        //public async Task<IActionResult> ApproveRequest(int id)
        //{
        //    await _leaveRequestService.ApproveRequest(id);
        //    return NoContent();
        //}
        //[HttpPut]
        //public async Task<IActionResult> RejectRequest(int id)
        //{
        //    await _leaveRequestService.RejectRequest(id);
        //    return Ok();
        //}
    }

}
