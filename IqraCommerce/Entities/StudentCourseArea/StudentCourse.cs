using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.StudentCourseArea
{
    [Table("StudentCourse")]
    [Alias("stdntcrsh")]
    public class StudentCourse: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid CourseId { get; set; }
        public Guid BatchId { get; set; }
    }
}
