using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.CourseArea
{
    [Table("Course")]
    [Alias("crsh")]

    public class Course: DropDownBaseEntity
    {
        public Guid ScheduleId { get; set; }
        public string Class { get; set; }
        public int NumberOfClass { get; set; }
        public double CourseFee { get; set; }
        public double CoachingPercentange { get; set; }
        public string DurationInMonth { get; set; }
        public double Hour { get; set; }    
        public string Version { get; set; }
        public bool IsActive { get; set; }

    }
}
