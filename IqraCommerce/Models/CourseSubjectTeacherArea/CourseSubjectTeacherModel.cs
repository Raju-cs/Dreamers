using System;
namespace IqraCommerce.Models.TeacherCourseArea
{
    public class CourseSubjectTeacherModel: AppDropDownBaseModel
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid CourseId { get; set; }
        public double TeacherPercentange { get; set; }
        public double CoachingPercentange { get; set; }

    }
}
