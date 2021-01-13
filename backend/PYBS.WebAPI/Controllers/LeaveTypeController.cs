using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.LeaveDtos;
using PYBS.Entity.Dtos.LeaveTypeDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveTypeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private PYBSContext context = new PYBSContext();
        public LeaveTypeController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddLeaveType(LeaveTypeAddDto leaveTypeAddDto)
        {
            try
            {
                var leaveType = _mapper.Map<LeaveType>(leaveTypeAddDto);
                context.LeaveTypes.Add(leaveType);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateLeaveType(LeaveTypeUpdateDto leaveTypeUpdateDto)
        {
            try
            {
                var oldLeaveType = await context.LeaveTypes.FirstOrDefaultAsync(lt => lt.Id == leaveTypeUpdateDto.Id);
                var newLeaveType = _mapper.Map<LeaveTypeUpdateDto, LeaveType>(leaveTypeUpdateDto, oldLeaveType);
                context.LeaveTypes.Update(newLeaveType);
                await context.SaveChangesAsync();
                return Ok(newLeaveType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteLeaveType(int leaveTypeId)
        {
            try
            {
                var leaveType = await context.LeaveTypes.FirstOrDefaultAsync(x => x.Id == leaveTypeId);
                if (leaveType==null)
                {
                    return BadRequest();
                }
                context.LeaveTypes.Remove(leaveType);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetLeaveType(int leaveTypeId)
        {
            try
            {
                var leaveType = await context.LeaveTypes.FirstOrDefaultAsync(x => x.Id == leaveTypeId);
                if (leaveType == null)
                {
                    return BadRequest();
                }
                return Ok(leaveType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllLeaveType()
        {
            try
            {
                var leaveTypes = await context.LeaveTypes.ToListAsync();
                if (leaveTypes == null)
                {
                    return BadRequest();
                }
                return Ok(leaveTypes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
