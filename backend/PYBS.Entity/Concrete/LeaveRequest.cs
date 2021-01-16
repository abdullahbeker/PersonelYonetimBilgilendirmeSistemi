using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PYBS.Entity.Concrete
{
  public class LeaveRequest : ITable
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public AppUser AppUser { get; set; }
    public int LeaveTypeId { get; set; }
    public LeaveType LeaveType { get; set; }
    public int LeaveStatusId { get; set; }
    public LeaveStatus LeaveStatus { get; set; }
    public DateTime LeaveStartDate { get; set; }
    public DateTime LeaveFinishDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }
  }
}
