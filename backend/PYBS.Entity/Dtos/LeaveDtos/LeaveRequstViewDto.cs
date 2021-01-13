using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.LeaveDtos
{
    public class LeaveRequstViewDto
    {
        public int UserId { get; set; }
        public int RequestId { get; set; }
        public string FullName { get; set; }
        public string LeaveTypeName { get; set; }
        public bool IsPaid { get; set; }
        public DateTime LeaveStartDate { get; set; }
        public DateTime LeaveFinishDate { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
