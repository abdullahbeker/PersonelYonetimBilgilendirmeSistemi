using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.AppUserDtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PYBS.Business.Abstract
{
    public interface IAppUserService : IGenericService<AppUser>
    {
        Task<AppUser> FindByUsername(string username);
        Task<bool> CheckPassword(AppUserLoginDto appUserLoginDto);
        Task<List<AppRole>> GetRolesByUsername(string username);
    }
}
