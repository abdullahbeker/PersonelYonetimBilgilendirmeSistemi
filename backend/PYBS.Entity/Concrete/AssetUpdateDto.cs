using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Concrete
{
    public class AssetUpdateDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string SerialNumber { get; set; }
        public string Description { get; set; }
        public DateTime? GivenDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool IsAvailable { get; set; }
        public int PersonnelId { get; set; }
    }
}
