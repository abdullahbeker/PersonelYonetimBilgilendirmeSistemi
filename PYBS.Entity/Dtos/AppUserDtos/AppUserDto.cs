using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.AppUserDtos
{
    public class AppUserDto
    {
        public string Username { get; set; }
        public List<string> Roles { get; set; }
    }
}
