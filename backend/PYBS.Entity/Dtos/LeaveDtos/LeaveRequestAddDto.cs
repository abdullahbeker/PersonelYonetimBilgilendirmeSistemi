using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.LeaveDtos
{
    public class LeaveRequestAddDto
    {
        public int UserId { get; set; }
        public int LeaveTypeId { get; set; }
        public int LeaveStatusId { get; set; }
        public DateTime LeaveStartDate { get; set; }
        public DateTime LeaveFinishDate { get; set; }
    }
}
