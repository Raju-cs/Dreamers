using IqraCommerce.Entities.RoutineArea;
using IqraCommerce.Models.RoutineArea;
using IqraCommerce.Services.RoutineArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.RoutineArea
{
    public class RoutineController: AppDropDownController<Routine, RoutineModel>
    {
        RoutineService ___service;

        public RoutineController()
        {
            service = __service = ___service = new RoutineService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

    }
}
