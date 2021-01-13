using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.LeaveTypeDtos
{
    public class LeaveTypeUpdateDto
    {
        public int Id { get; set; }
        public string LeaveName { get; set; }
        public bool IsPaid { get; set; }
    }
}
