using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.LeaveDtos
{
    public class LeaveRequestListWithUserDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<LeaveRequestListDto> LeaveRequestLists { get; set; }
    }
}
