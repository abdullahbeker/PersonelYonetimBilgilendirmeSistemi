using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
    public class BloodType : ITable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //References
        public List<AppUser> AppUsers { get; set; }
    }
}
