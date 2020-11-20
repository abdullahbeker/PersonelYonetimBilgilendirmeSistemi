using PYBS.Business.Abstract;
using PYBS.DataAccess.Abstract;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.AppUserDtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.Business.Concrete
{
    public class AppUserManager : GenericManager<AppUser>, IAppUserService
    {
        private readonly IAppUserDal _appUserDal;
        public AppUserManager(IGenericDal<AppUser> genericDal, IAppUserDal appUserDal): base(genericDal)
        {
            _appUserDal = appUserDal;
        }

        public async Task<bool> CheckPassword(AppUserLoginDto appUserLoginDto)
        {
            var appUser=await _appUserDal.GetByFilter(x => x.Username == appUserLoginDto.Username);
            return appUser.Password == appUserLoginDto.Password ? true : false;
        }

        public async Task<AppUser> FindByUsername(string username)
        {
            return await _appUserDal.GetByFilter(x => x.Username == username);
        }

        public async Task<List<AppRole>> GetRolesByUsername(string username)
        {
            return await _appUserDal.GetRolesByUsername(username);
        }
    }
}
