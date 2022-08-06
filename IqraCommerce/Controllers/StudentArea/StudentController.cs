using IqraCommerce.Entities.StudentArea;
using System;
using IqraCommerce.Models.StudentArea;
using IqraCommerce.Services.StudentArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.StudentArea
{
    public class StudentController: AppDropDownController<Student, StudentModel>
    {
        StudentService ___service;
        public StudentController()
        {
            service = __service = ___service = new StudentService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }
    }
}
