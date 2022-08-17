using IqraCommerce.Entities.StudentCourseArea;
using IqraCommerce.Models.StudentCourseArea;
using IqraCommerce.Services.StudentCourseArea;

namespace IqraCommerce.Controllers.StudentCourseArea
{
    public class StudentCourseController: AppDropDownController<StudentCourse, StudentCourseModel>
    {
        StudentCourseService ___service;

        public StudentCourseController()
        {
            service = __service = ___service = new StudentCourseService();
        }
    }
}
