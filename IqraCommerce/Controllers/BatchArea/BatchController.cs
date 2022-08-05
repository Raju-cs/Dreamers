using IqraCommerce.Entities.BatchArea;
using System;
using IqraCommerce.Models.BatchArea;
using IqraCommerce.Services.BatchArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.BatchArea
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
