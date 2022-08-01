using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.CourseArea
{
    [Table("Course")]
    [Alias("crsh")]

    public class Course: DropDownBaseEntity
    {
        public string Class { get; set; }
        public string DurationInMonth { get; set; }
        public double Hour { get; set; }    
        public string Version { get; set; }
        public bool IsActive { get; set; }

    }
}
