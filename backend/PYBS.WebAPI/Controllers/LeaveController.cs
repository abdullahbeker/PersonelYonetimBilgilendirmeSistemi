using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PYBS.Business.Abstract;
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
        private readonly ILeaveTypeService _leaveTypeService;
        private readonly ILeaveRequestService _leaveRequestService;
        private readonly IMapper _mapper;

        public LeaveController(ILeaveTypeService leaveTypeService, ILeaveRequestService leaveRequestService, IMapper mapper)
        {
            _mapper = mapper;
            _leaveRequestService = leaveRequestService;
            _leaveTypeService = leaveTypeService;
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var requests = await _leaveRequestService.GetAllWithReferences();
            List<LeaveRequestListAllDto> leaveRequestList = new List<LeaveRequestListAllDto>();
            foreach (var request in requests)
            {
                LeaveRequestListAllDto leaveRequest = new LeaveRequestListAllDto();
                leaveRequest.Id = request.Id;
                leaveRequest.UserId = request.UserId;
                leaveRequest.Name = request.AppUser.Name;
                leaveRequest.Surname = request.AppUser.Surname;
                leaveRequest.LeaveStatusName = request.LeaveStatus.Name;
                leaveRequest.LeaveTypeName = request.LeaveType.LeaveName;
                leaveRequest.LeaveStartDate = request.LeaveStartDate;
                leaveRequest.LeaveFinishDate = request.LeaveFinishDate;

                leaveRequestList.Add(leaveRequest);
            }
            return Ok(leaveRequestList);
        }
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _leaveRequestService.GetById(id));
        }
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetAllByUserId(int id)
        {
            var requests = await _leaveRequestService.GetAllWithReferences();
            LeaveRequestListWithUserDto leaveRequestListWithUser = new LeaveRequestListWithUserDto();
            leaveRequestListWithUser.UserId = requests[0].AppUser.Id;
            leaveRequestListWithUser.Name = requests[0].AppUser.Name;
            leaveRequestListWithUser.Surname = requests[0].AppUser.Surname;

            List<LeaveRequestListDto> leaveRequestList = new List<LeaveRequestListDto>();
            foreach (var request in requests)
            {
                LeaveRequestListDto leaveRequest = new LeaveRequestListDto();
                leaveRequest.Id = request.Id;
                leaveRequest.LeaveStatusName = request.LeaveStatus.Name;
                leaveRequest.LeaveTypeName = request.LeaveType.LeaveName;
                leaveRequest.LeaveStartDate = request.LeaveStartDate;
                leaveRequest.LeaveFinishDate = request.LeaveFinishDate;

                leaveRequestList.Add(leaveRequest);
            }
            leaveRequestListWithUser.LeaveRequestLists = leaveRequestList;
            return Ok(leaveRequestListWithUser);
        }
        [HttpPost]
        public async Task<IActionResult> CreateType(LeaveTypeAddDto leaveTypeAddDto)
        {
            if (ModelState.IsValid)
            {
                await _leaveTypeService.Add(_mapper.Map<LeaveType>(leaveTypeAddDto));
                return Created("", leaveTypeAddDto);
            }
            return BadRequest();
        }
        [HttpPost]
        public async Task<IActionResult> CreateRequest(LeaveRequestAddDto leaveRequestAddDto)
        {
            if (ModelState.IsValid)
            {
                await _leaveRequestService.Add(_mapper.Map<LeaveRequest>(leaveRequestAddDto));
                return Created("", leaveRequestAddDto);
            }
            return BadRequest();
        }
        [HttpPut]
        public async Task<IActionResult> ApproveRequest(int id)
        {
            await _leaveRequestService.ApproveRequest(id);
            return NoContent();
        }
        [HttpPut]
        public async Task<IActionResult> RejectRequest(int id)
        {
            await _leaveRequestService.RejectRequest(id);
            return Ok();
        }
    }
}
