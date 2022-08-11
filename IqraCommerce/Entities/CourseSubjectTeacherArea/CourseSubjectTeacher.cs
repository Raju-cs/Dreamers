using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.CourseSubjectTeacherArea
{
    [Table("CourseSubjectTeacher")]
    [Alias("crsbjctchr")]
    public class CourseSubjectTeacher: DropDownBaseEntity
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid CourseId { get; set; }
        public double TeacherPercentange { get; set; }
        public double CoachingPercentange { get; set; }
    }
}
