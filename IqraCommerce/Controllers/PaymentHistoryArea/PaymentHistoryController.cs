using IqraCommerce.Entities.PaymentHistoryArea;
using IqraCommerce.Models.PaymentHistoryArea;
using IqraCommerce.Services.PaymentHistoryArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.PaymentHistoryArea
{
    public class PaymentHistoryController: AppDropDownController<PaymentHistory, PaymentHistoryModel>
    {
        PaymentHistoryService ___service;

        public PaymentHistoryController()
        {
            service = __service = ___service = new PaymentHistoryService();
        }

        [HttpPost]
        public async Task<JsonResult> PaymentHistory([FromBody] Page page)
        {


            return Json(await ___service.PaymentHistory(page));
        }

        public async Task<JsonResult> Due([FromBody] Page page)
        {


            return Json(await ___service.Due(page));
        }

        public async Task<JsonResult> Paid([FromBody] Page page)
        {


            return Json(await ___service.Paid(page));
        }
    }
}
