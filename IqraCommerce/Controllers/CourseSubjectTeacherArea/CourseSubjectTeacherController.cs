using IqraCommerce.Entities.CourseSubjectTeacherArea;
using IqraCommerce.Models.TeacherCourseArea;
using IqraCommerce.Services.CourseSubjectTeacherArea;

namespace IqraCommerce.Controllers.CourseSubjectTeacherArea
{
    public class CourseSubjectTeacherController: AppDropDownController<CourseSubjectTeacher, CourseSubjectTeacherModel>
    {
        CourseSubjectTeacherService ___service;

        public CourseSubjectTeacherController()
        {
            service = __service = ___service = new CourseSubjectTeacherService();
        }
    }
}
