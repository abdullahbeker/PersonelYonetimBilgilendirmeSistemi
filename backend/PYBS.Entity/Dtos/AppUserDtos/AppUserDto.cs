using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.AppUserDtos
{
    public class AppUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<string> Roles { get; set; }
    }
}
