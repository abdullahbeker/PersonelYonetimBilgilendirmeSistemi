
using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
    public class AppUser : ITable
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public List<AppUserRole> AppUserRoles { get; set; }
        //Personnel
        public string PersonnelNumber { get; set; }
        public string BonusCode { get; set; }
        public bool? IsWorking { get; set; }
        public string Division { get; set; }
        public string EmployerCompany { get; set; }
        public DateTime? StartingDateOfEmployment { get; set; }
        public DateTime? SGKFirstEntry { get; set; }
        public string Department { get; set; }
        public string Duty { get; set; }
        public string BCWC { get; set; }
        public string Status { get; set; }
        //Profile
        public string IdentityNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? Birthday { get; set; }
        public int? BloodTypeId { get; set; }
        public BloodType? BloodType { get; set; }
        public int? MaritalStatusId { get; set; }
        public MaritalStatus? MaritalStatus { get; set; }
        public int? GenderId { get; set; }
        public Gender? Gender { get; set; }
        public int? ChildCount { get; set; }
        public string Graduation { get; set; }
        public string GraduationDepartment { get; set; }
        public string PhoneNumber { get; set; }
        //Address
        public string Description { get; set; }
        public int? ProvinceId { get; set; }
        public Province? Province { get; set; }
        public int? DistrictId { get; set; }
        public District? District { get; set; }
        //TimeStamps
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        //References
        public List<LeaveRequest> LeaveRequests { get; set; }

    }
}
