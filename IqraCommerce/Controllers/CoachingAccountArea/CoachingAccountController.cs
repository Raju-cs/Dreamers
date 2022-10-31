using IqraCommerce.Entities.CoachingAccountArea;
using IqraCommerce.Models.CoachingAccountArea;
using IqraCommerce.Services.CoachingAccountArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.CoachingAccountArea
{
    public class CoachingAccountController : AppDropDownController<CoachingAccount, CoachingAccountModel>
    {
        CoachingAccountService ___service;

        public CoachingAccountController()
        {
            service = __service = ___service = new CoachingAccountService();
        }

        public async Task<JsonResult> ToatalAmount([FromBody] Page page)
        {
            return Json(await ___service.ToatalAmount(page));
        }
    }
}
