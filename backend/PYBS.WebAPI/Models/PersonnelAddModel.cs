using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Models
{
    public class PersonnelAddModel
    {       
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string EmployerCompany { get; set; }
        public string PersonnelNumber { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Department { get; set; }
        public string Duty { get; set; }
        public IFormFile Image { get; set; }
        public DateTime StartingDateOfEmployment { get; set; }
        public int GenderId { get; set; }
    }
}
