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
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class PersonnelController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly string _uploadPath;

        public PersonnelController(IMapper mapper)
        {
            _uploadPath = Path.Combine("Content", "Images", "Personnel");
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
                    Surname = x.Surname,
                    PersonnelNumber = x.PersonnelNumber,
                    EmployerCompany = x.EmployerCompany
                }).ToListAsync();


                return Ok(data);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> PersonnelAdd([FromForm]PersonnelAddModel model)
        {
            try
            {
                string filePath = "";

                if (model.Image != null && model.Image.Length > 0)
                {
                    filePath = Path.Combine(_uploadPath, DateTime.Now.Ticks + "_" + model.Image.FileName);
                    var combined = Path.Combine(Directory.GetCurrentDirectory(), filePath);
                    using Stream fileStream = new FileStream(combined, FileMode.Create);
                    await model.Image.CopyToAsync(fileStream);
                } else
                {
                    return BadRequest("Personnel image must be provided");
                }

                using var context = new PYBSContext();

                AppUser user = await context.AppUsers.FirstOrDefaultAsync(x => x.Username == model.Username);

                if (user != null) return BadRequest("Provided username is in use");

                user = _mapper.Map<AppUser>(model);
                user.ImageUrl = filePath;
                user.ImageContentType = model.Image.ContentType;

                context.AppUsers.Add(user);
                context.SaveChanges();

                context.AppUserRoles.Add(new AppUserRole
                {
                    AppUserId = user.Id,
                    AppRoleId = 1
                });

                context.SaveChanges();
                return Ok();

            } catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> PersonnelDetails(int personnelId)
        {
            try
            {
                using var context = new PYBSContext();
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

                string pathToImage = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", appUser.ImageUrl);
                byte[] imageBytes = System.IO.File.ReadAllBytes(pathToImage);

                user.ImageData = Convert.ToBase64String(imageBytes);
                user.BloodType = blood == null ? "" : blood.Name;
                user.Gender = gender == null ? "" : gender.Name;
                user.District = district == null ? "" : district.Name;
                user.MaritalStatus = martial == null ? "" : martial.Name;
                user.Province = province == null ? "" : province.Name;
                return Ok(user);
            } catch (Exception e)
            {
                return StatusCode(500, e);
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
