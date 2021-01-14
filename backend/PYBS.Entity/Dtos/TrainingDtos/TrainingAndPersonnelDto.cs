using PYBS.Entity.Concrete;
using PYBS.Entity.Concrete.TrainingEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.TrainingDtos
{
    public class TrainingAndPersonnelDto
    {
        public Training Training { get; set; }
        public List<AppUser> AppUsers { get; set; }
    }
}
