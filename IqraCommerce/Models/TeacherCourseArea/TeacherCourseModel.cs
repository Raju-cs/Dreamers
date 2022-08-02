using System;
namespace IqraCommerce.Models.TeacherCourseArea
{
    public class TeacherCourseModel: AppDropDownBaseModel
    {
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }
        public double Charge { get; set; }

    }
}
