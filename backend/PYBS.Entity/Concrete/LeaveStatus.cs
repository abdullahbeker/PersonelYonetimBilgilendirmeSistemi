using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
  public class LeaveStatus : ITable
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public List<LeaveRequest> LeaveRequests { get; set; }
  }
}
