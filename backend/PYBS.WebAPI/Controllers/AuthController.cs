using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PYBS.Business.Abstract;
using PYBS.Business.StringInfos;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.AppUserDtos;
using PYBS.Entity.Token;

namespace PYBS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IAppUserService _appUserService;
        private readonly IMapper _mapper;
        public AuthController(IJwtService jwtService, IAppUserService appUserService, IMapper mapper)
        {
            _mapper = mapper;
            _jwtService = jwtService;
            _appUserService = appUserService;
        }

        [HttpPost("[action]")]
        //[ValidModel]
        public async Task<IActionResult> SignIn([FromBody] AppUserLoginDto appUserLoginDto)
        {
            try
            {
                var appUser = await _appUserService.FindByUsername(appUserLoginDto.Username);
                if (appUser == null)
                {
                    return BadRequest("Kullanıcı adı veya şifre hatalı");
                }
                else
                {
                    if (await _appUserService.CheckPassword(appUserLoginDto))
                    {
                        var roles = await _appUserService.GetRolesByUsername(appUserLoginDto.Username);
                        var token = _jwtService.GenerateJwt(appUser, roles);
                        JwtAccessToken jwtAccessToken = new JwtAccessToken();
                        jwtAccessToken.Token = token;
                        return Created("", jwtAccessToken);
                    }
                    return BadRequest("Kullanıcı adı veya şifre hatalı");
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost("[action]")]
        //[ValidModel]
        public async Task<IActionResult> SignUp(AppUserAddDto appUserAddDto, [FromServices] IAppUserRoleService appUserRoleService, [FromServices] IAppRoleService appRoleService)
        {
            var appUser = await _appUserService.FindByUsername(appUserAddDto.Username);
            if (appUser != null)
            {
                return BadRequest($"{appUserAddDto.Username} zaten alınmış");
            }

            await _appUserService.Add(_mapper.Map<AppUser>(appUserAddDto));

            var user = await _appUserService.FindByUsername(appUserAddDto.Username);
            var role = await appRoleService.FindByName(RoleInfo.Member);

            await appUserRoleService.Add(new AppUserRole
            {
                AppRoleId = role.Id,
                AppUserId = user.Id
            });
            return Created("", true);
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IActionResult> ActiveUser()
        {
            var user = await _appUserService.FindByUsername(User.Identity.Name);
            var roles = await _appUserService.GetRolesByUsername(User.Identity.Name);
            AppUserDto appUserDto = new AppUserDto()
            {
                Id = user.Id,
                Name = user.Name,
                SurName = user.Surname,
                Username = user.Username,
                Roles = roles.Select(x => x.Name).ToList()
            };
            return Ok(appUserDto);
        }
    }
}
