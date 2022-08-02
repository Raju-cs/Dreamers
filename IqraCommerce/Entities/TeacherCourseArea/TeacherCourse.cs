using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.TeacherCourseArea
{
    [Table("TeacherCourse")]
    [Alias("tchrcrs")]
    public class TeacherCourse: DropDownBaseEntity
    {
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }
        public double Charge { get; set; }
    }
}
