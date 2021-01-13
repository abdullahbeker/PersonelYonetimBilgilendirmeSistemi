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
        public async Task<List<LeaveRequest>> GetAllLeave()
        {
            return await context.LeaveRequests.ToListAsync();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetLeave(int id)
        {
            var leave = await context.LeaveRequests.FirstOrDefaultAsync(x => x.Id == id);
            if (leave==null) BadRequest();
            return Ok(leave);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllLeavesByPersonnelId(int personnelId)
        {
            var leave = await context.LeaveRequests
                .Where(x => x.UserId == personnelId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
            if (leave.Count == 0) return BadRequest();
            return Ok(leave);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> LeaveStatus([FromBody]ApprovalLeaveDto data)
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
    }

}
