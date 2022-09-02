using System;

namespace IqraCommerce.Models.StudentCourseArea
{
    public class StudentCourseModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid CourseId { get; set; }
        public Guid BatchId { get; set; }
    }
}
