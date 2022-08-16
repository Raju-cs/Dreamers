using System;
using IqraCommerce.Entities.ScheduleArea;
using IqraCommerce.Models.ScheduleArea;
using IqraCommerce.Services.ScheduleArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.ScheduleArea
{
    public class ScheduleController: AppDropDownController<Schedule, ScheduleModel>
    {
        ScheduleService ___service;

        public ScheduleController()
        {
            service = __service = ___service = new ScheduleService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

    }
}
