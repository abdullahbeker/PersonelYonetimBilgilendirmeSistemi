using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.LeaveDtos
{
    public class LeaveRequestListAllDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int LeaveTypeId { get; set; }
        public string LeaveTypeName { get; set; }
        public int LeaveStatusId { get; set; }
        public string LeaveStatusName { get; set; }
        public DateTime LeaveStartDate { get; set; }
        public DateTime LeaveFinishDate { get; set; }
    }
}
