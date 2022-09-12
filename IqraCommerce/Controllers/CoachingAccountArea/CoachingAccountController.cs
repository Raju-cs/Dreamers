using IqraCommerce.Entities.CoachingAccountArea;
using IqraCommerce.Models.CoachingAccountArea;
using IqraCommerce.Services.CoachingAccountArea;
using System;

namespace IqraCommerce.Controllers.CoachingAccountArea
{
    public class CoachingAccountController : AppDropDownController<CoachingAccount, CoachingAccountModel>
    {
        CoachingAccountService ___service;

        public CoachingAccountController()
        {
            service = __service = ___service = new CoachingAccountService();
        }

      
    }
}
