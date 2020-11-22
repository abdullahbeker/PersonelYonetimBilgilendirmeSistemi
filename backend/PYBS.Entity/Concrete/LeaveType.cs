using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
  public class LeaveType : ITable
  {
    public int Id { get; set; }
    public string LeaveName { get; set; }
    public bool IsPaid { get; set; }
    public List<LeaveRequest> LeaveRequests { get; set; }
  }
}
