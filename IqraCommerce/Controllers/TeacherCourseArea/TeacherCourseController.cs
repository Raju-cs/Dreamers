using IqraCommerce.Entities.TeacherCourseArea;
using IqraCommerce.Models.TeacherCourseArea;
using IqraCommerce.Services.TeacherCourseArea;

namespace IqraCommerce.Controllers.TeacherCourseArea
{
    public class TeacherCourseController: AppDropDownController<TeacherCourse, TeacherCourseModel>
    {
        TeacherCourseService ___service;

        public TeacherCourseController()
        {
            service = __service = ___service = new TeacherCourseService();
        }
    }
}
