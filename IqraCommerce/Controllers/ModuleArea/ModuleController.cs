using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using IqraCommerce.Models.ModuleArea;
using IqraCommerce.Entities.ModuleArea;
using IqraCommerce.Services.ModuleArea;
using IqraCommerce.Entities.SubjectArea;
using System.Collections.Generic;
using System.Linq;

namespace IqraCommerce.Controllers.ModuleArea
{
    public class ModuleController : AppDropDownController<Module, ModuleModel>
    {
        ModuleService ___service;

        public ModuleController()
        {
            service = __service = ___service = new ModuleService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }
    }
}
