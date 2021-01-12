using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Models
{
    public class PersonnelViewList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Department { get; set; }
        public string Duty { get; set; }
        public string PersonnelNumber { get; set; }
        public string EmployerCompany { get; set; }
    }
}
