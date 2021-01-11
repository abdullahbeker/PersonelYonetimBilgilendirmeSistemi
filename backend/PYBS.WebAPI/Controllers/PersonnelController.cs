using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Concrete;
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
                AppUser appUser = new AppUser()
                {
                    Name = model.Name,
                    Surname = model.Surname,
                    Email = model.EmailAddress,
                    Password = model.Password,
                    StartingDateOfEmployment = model.StartingDateOfEmployment,
                    GenderId = model.GenderId
                };

                await context.AppUsers.AddAsync(appUser);
                AppUserRole role = new AppUserRole()
                {
                    AppUserId = appUser.Id,
                    AppRoleId = model.RoleId
                };
                await context.AppUserRoles.AddAsync(role);
                await context.SaveChangesAsync();

                return StatusCode(201, appUser);
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
                return Ok(appUser);
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
