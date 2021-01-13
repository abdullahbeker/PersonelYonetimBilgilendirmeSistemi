using AutoMapper;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.AppUserDtos;
using PYBS.Entity.Dtos.LeaveDtos;
using PYBS.Entity.Dtos.LeaveTypeDtos;
using PYBS.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Mapping.AutoMapper
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<AppUserAddDto, AppUser>();
            CreateMap<AppUser, AppUserAddDto>();
            CreateMap<PersonnelAddModel, AppUser>();
            CreateMap<PersonnelEditModel, AppUser>();
            CreateMap<AppUser, AppUserDetailsDto>();
            CreateMap<LeaveRequestAddDto, LeaveRequest>();
            //LeaveType
            CreateMap<LeaveType, LeaveTypeAddDto>();
            CreateMap<LeaveTypeAddDto, LeaveType>();
            CreateMap<LeaveType, LeaveTypeUpdateDto>();
            CreateMap<LeaveTypeUpdateDto, LeaveType>();
            //LeaveRequest
        }
    }
}
