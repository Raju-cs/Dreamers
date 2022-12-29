using IqraCommerce.Entities.ExtendPaymentdateArea;
using IqraCommerce.Entities.FeesArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.ExtendPaymentDateArea;
using IqraCommerce.Services.ExtendPaymentDateArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.ExtendPaymentDateArea
{
    public class ExtendPaymentDateController: AppDropDownController<ExtendPaymentDate, ExtendPaymentDateModel>
    {
        ExtendPaymentDateService ___service;

        public ExtendPaymentDateController()
        {
            service = __service = ___service = new ExtendPaymentDateService();
        }

      

        public  ActionResult ExtendPaymentDate([FromForm] ExtendPaymentDateModel recordToCreate)
        {

            var extendPaymentDateEntity = ___service.GetEntity<ExtendPaymentDate>();
            var extendPaymentDateForDB = ___service.GetEntity<ExtendPaymentDate>().FirstOrDefault(exp => exp.PeriodId == recordToCreate.PeriodId 
                                                                                                             && exp.StudentId == recordToCreate.StudentId);

         
            if(extendPaymentDateForDB != null)
            {
                extendPaymentDateForDB.ExtendPaymentdate = recordToCreate.ExtendPaymentdate;
                extendPaymentDateForDB.UpdatedBy = Guid.Empty;
                extendPaymentDateForDB.UpdatedAt = DateTime.Now;
            }
            else
            {
                ExtendPaymentDate extendPaymentDate = new ExtendPaymentDate()
                {
                    ActivityId = Guid.Empty,
                    Id = Guid.NewGuid(),
                    PeriodId = recordToCreate.PeriodId,
                    StudentId = recordToCreate.StudentId,
                    ExtendPaymentdate = recordToCreate.ExtendPaymentdate,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    Remarks = null

                };
                extendPaymentDateEntity.Add(extendPaymentDate);
            }

            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }

            return Ok(new Response(extendPaymentDateForDB, extendPaymentDateForDB, false, "Success"));
        }
    }
}
