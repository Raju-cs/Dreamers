
using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Models.StudentModuleArea;
using IqraCommerce.Services.StudentModuleArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace IqraCommerce.Controllers.StudentModuleArea
{
    public class StudentModuleController: AppDropDownController<StudentModule, StudentModuleModel>
    {
        StudentModuleService ___service;

        public StudentModuleController()
        {
            service = __service = ___service = new StudentModuleService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

    }
}
