using PYBS.Business.Abstract;
using PYBS.DataAccess.Abstract;
using PYBS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Business.Concrete
{
  public class LeaveTypeManager : GenericManager<LeaveType>, ILeaveTypeService
  {
    private readonly IGenericDal<LeaveType> _genericDal;
    public LeaveTypeManager(IGenericDal<LeaveType> genericDal):base(genericDal)
    {
      _genericDal = genericDal;
    }
  }
}
