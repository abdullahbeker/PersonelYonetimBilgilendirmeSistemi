using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.AppUserDtos;
using PYBS.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class PersonnelController : ControllerBase
    {
        private readonly IMapper _mapper;
        public PersonnelController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        [Route("personnels")]
        public async Task<ActionResult> PersonnelList()
        {
            using (var context = new PYBSContext())
            {
                List<PersonnelViewList> data = await context.AppUsers.Select(x => new PersonnelViewList
                {
                    Id = x.Id,
                    Department = x.Department,
                    Duty = x.Duty,
                    Name = x.Name,
                    Surname = x.Surname
                }).ToListAsync();


                return Ok(data);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> PersonnelAdd(PersonnelAddModel model)
        {
            using (var context = new PYBSContext())
            {
                var user = await context.AppUsers.FirstOrDefaultAsync(x => x.Id == model.Id);
                user.Name = model.Name;
                user.Surname = model.Surname;
                

                context.AppUsers.Update(user);
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

                return StatusCode(201, user);
            }
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> PersonnelDetails(int personnelId)
        {
            using (var context = new PYBSContext())
            {
                AppUser appUser = await context.AppUsers.FirstOrDefaultAsync(x => x.Id == personnelId);
                if (appUser == null)
                {
                    return BadRequest();
                }
                AppUserDetailsDto user = _mapper.Map<AppUserDetailsDto>(appUser);
                var blood = context.BloodTypes.FirstOrDefault(x => x.Id == appUser.BloodTypeId);
                var gender = context.Genders.FirstOrDefault(x => x.Id == appUser.GenderId);
                var district = context.Districts.FirstOrDefault(x => x.Id == appUser.DistrictId);
                var martial = context.MaritalStatuses.FirstOrDefault(x => x.Id == appUser.MaritalStatusId);
                var province = context.Provinces.FirstOrDefault(x => x.Id == appUser.ProvinceId);

                user.BloodType = blood==null?"":blood.Name;
                user.Gender = gender == null ? "" : gender.Name;
                user.District = district == null ? "" : district.Name;
                user.MaritalStatus = martial == null ? "" : martial.Name;
                user.Province = province == null ? "" : province.Name;
                return Ok(user);
            }
        }

        [HttpDelete]
        [Route("[action]")]
        public async Task<ActionResult> PersonnelDelete(int personnelId)
        {
            using (var context = new PYBSContext())
            {
                AppUser appUser = await context.AppUsers.FirstOrDefaultAsync(x => x.Id == personnelId);
                if (appUser == null)
                {
                    return BadRequest();
                }
                else
                {
                    context.AppUsers.Remove(appUser);
                    await context.SaveChangesAsync();
                    return StatusCode(204);
                }
            }
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<ActionResult> PersonnelEdit(int personnelId, [FromBody] PersonnelEditModel model)
        {
            using (var context = new PYBSContext())
            {
                AppUser appUser = await context.AppUsers.FirstOrDefaultAsync(x => x.Id == personnelId);
                if (appUser == null)
                {
                    return BadRequest();
                }
                else
                {
                    appUser = _mapper.Map<AppUser>(model);
                    context.AppUsers.Update(appUser);
                    await context.SaveChangesAsync();
                }
                return Ok(appUser);
            }
        }
    }
}
