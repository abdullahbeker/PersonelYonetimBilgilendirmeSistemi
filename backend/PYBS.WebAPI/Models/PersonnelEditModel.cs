using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Models
{
    public class PersonnelEditModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PersonnelNumber { get; set; }
        public string BonusCode { get; set; }
        public bool IsWorking { get; set; }
        public string Division { get; set; }
        public string EmployerCompany { get; set; }
        public DateTime StartingDateOfEmployment { get; set; }
        public DateTime SGKFirstEntry { get; set; }
        public string Department { get; set; }
        public string Duty { get; set; }
        public string BCWC { get; set; }
        public string Status { get; set; }
        public string IdentityNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birthday { get; set; }
        public int BloodTypeId { get; set; }
        public int MaritalStatusId { get; set; }
        public int GenderId { get; set; }
        public int ChildCount { get; set; }
        public string Graduation { get; set; }
        public string GraduationDepartment { get; set; }
        public string PhoneNumber { get; set; }
        //Address
        public string Description { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
    }
}
