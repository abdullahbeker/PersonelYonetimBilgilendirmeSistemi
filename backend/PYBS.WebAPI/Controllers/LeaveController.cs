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
    }

}
