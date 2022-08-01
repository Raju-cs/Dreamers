using IqraCommerce.Entities.CourseArea;
using IqraCommerce.Models.CourseArea;
using IqraCommerce.Services.CourseArea;

namespace IqraCommerce.Controllers.CourseArea
{
    public class CourseController: AppDropDownController<Course, CourseModel>
    {

        CourseService ___service;
        public CourseController()
        {
            service = __service = ___service = new CourseService();
        }
    }
}
