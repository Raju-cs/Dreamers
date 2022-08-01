using IqraCommerce.Entities.TeacherArea;
using IqraCommerce.Models.TeacherArea;
using IqraCommerce.Services.TeacherArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.TeacherArea
{
    public class TeacherController: AppDropDownController<Teacher, TeacherModel>
    {
        TeacherService ___service;

        public TeacherController()
        {
            service = __service = ___service = new TeacherService();
        }
        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }
    }
}
