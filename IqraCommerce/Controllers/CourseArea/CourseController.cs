using IqraCommerce.Entities.CourseArea;
using System;
using IqraCommerce.Models.CourseArea;
using IqraCommerce.Services.CourseArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.CourseArea
{
    public class CourseController: AppDropDownController<Course, CourseModel>
    {

        CourseService ___service;
        public CourseController()
        {
            service = __service = ___service = new CourseService();
        }
        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }
    }
}
