﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Models
{
    public class PersonnelAddModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public DateTime StartingDateOfEmployment { get; set; }
        public int GenderId { get; set; }
    }
}
