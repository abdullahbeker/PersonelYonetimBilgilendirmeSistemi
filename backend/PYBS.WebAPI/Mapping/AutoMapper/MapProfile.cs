using AutoMapper;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.AppUserDtos;
using PYBS.Entity.Dtos.LeaveDtos;
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

            CreateMap<LeaveTypeAddDto, LeaveType>();
            CreateMap<LeaveType, LeaveTypeAddDto>();
            CreateMap<PersonnelEditModel, AppUser>();
            CreateMap<AppUser, AppUserDetailsDto>();
            CreateMap<LeaveRequestAddDto, LeaveRequest>();
        }
    }
}
