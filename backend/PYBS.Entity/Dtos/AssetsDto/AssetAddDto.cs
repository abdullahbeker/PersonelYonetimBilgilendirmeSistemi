using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Dtos.AssetsDto
{
    public class AssetAddDto
    {
        public string CategoryName { get; set; }
        public string SerialNumber { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime? GivenDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}
