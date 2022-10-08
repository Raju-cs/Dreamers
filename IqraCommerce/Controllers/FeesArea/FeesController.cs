using IqraCommerce.Entities.FeesArea;
using IqraCommerce.Models.FeesArea;
using IqraCommerce.Services.FeesArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.FeesArea
{
    public class FeesController : AppDropDownController<Fees, FeesModel>
    {
        FeesService ___service;

        public FeesController()
        {
            service = __service = ___service = new FeesService();
        }
        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

        public async Task<JsonResult> TotalFee([FromBody] Page page)
        {
            return Json(await ___service.TotalFee(page));
        }
    }
}
