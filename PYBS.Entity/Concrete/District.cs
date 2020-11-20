using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
    public class District : ITable
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //References
        public int ProvinceId { get; set; }
        public Province Province { get; set; }
        public List<AppUser> AppUsers { get; set; }
    }
}
