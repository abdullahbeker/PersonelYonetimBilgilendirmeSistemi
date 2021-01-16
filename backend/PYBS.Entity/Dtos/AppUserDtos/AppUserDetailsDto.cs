using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.AppUserDtos
{
    public class AppUserDetailsDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PersonnelNumber { get; set; }
        public string BonusCode { get; set; }
        public string ImageData { get; set; }
        public string ImageContentType { get; set; }
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
        public int ChildCount { get; set; }
        public string Graduation { get; set; }
        public string GraduationDepartment { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string? Province { get; set; }
        public string? District { get; set; }
        public string? Gender { get; set; }
        public string? BloodType { get; set; }
        public string? MaritalStatus{ get; set; }
    }
}
