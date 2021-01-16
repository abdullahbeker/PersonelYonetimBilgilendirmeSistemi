using AutoMapper;
using PYBS.Entity.Concrete;
using PYBS.Entity.Concrete.TrainingEntities;
using PYBS.Entity.Dtos.AppUserDtos;
using PYBS.Entity.Dtos.AssetsDto;
using PYBS.Entity.Dtos.LeaveDtos;
using PYBS.Entity.Dtos.LeaveTypeDtos;
using PYBS.Entity.Dtos.TrainingDtos;
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
            //LeaveType
            CreateMap<LeaveType, LeaveTypeAddDto>();
            CreateMap<LeaveTypeAddDto, LeaveType>();
            CreateMap<LeaveType, LeaveTypeUpdateDto>();
            CreateMap<LeaveTypeUpdateDto, LeaveType>();
            //LeaveRequest
            CreateMap<LeaveRequestAddDto, LeaveRequest>();
            //Training
            CreateMap<TrainingAddDto, Training>();
            //Assets
            CreateMap<AssetAddDto, Asset>();
            CreateMap<AssetUpdateDto, Asset>();

        }
    }
}
