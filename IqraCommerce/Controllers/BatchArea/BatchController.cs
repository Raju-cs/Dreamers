using System;
using IqraCommerce.Services.ScheduleArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using IqraCommerce.Entities.BatchArea;
using IqraCommerce.Models.BatchArea;

namespace IqraCommerce.Controllers.ScheduleArea
{
    public class BatchController: AppDropDownController<Batch, BatchModel>
    {
        BatchService ___service;

        public BatchController()
        {
            service = __service = ___service = new BatchService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

    }
}
