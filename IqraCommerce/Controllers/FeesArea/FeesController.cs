using IqraCommerce.Entities.CoachingAccountArea;
using IqraCommerce.Entities.FeesArea;
using IqraCommerce.Entities.ModuleArea;
using IqraCommerce.Entities.TeacherFeeArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.CoachingAccountArea;
using IqraCommerce.Models.FeesArea;
using IqraCommerce.Models.TeacherFeeArea;
using IqraCommerce.Services.FeesArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
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

        [HttpPost]
        public async Task<IActionResult> PayFees([FromForm] FeesModel recordToCreate)
        {
            var amount = recordToCreate.Fee;
            var modulesFromDb = await ___service.GetModules(recordToCreate.StudentId, recordToCreate.PeriodId);

            var sumOfFees = modulesFromDb.Sum(m => m.ModuleFees);

            var payments = ___service.GetEntity<Fees>().Where(f => f.IsDeleted == false && f.StudentId == recordToCreate.StudentId && f.PeriodId == recordToCreate.PeriodId);
            
            var sumOfPaid = payments.Sum(f => f.Fee);

            if (payments != null)
            {
            var paid = sumOfPaid + recordToCreate.Fee;

                if (sumOfFees >= amount && sumOfFees >= paid)
                {
                    __service.Insert(recordToCreate, Guid.Empty);
                }
                else
                {
                    return Json(new Response(-7, null, true, "Paymnet Over"));
                }
            }
            else
            {
                __service.Insert(recordToCreate, Guid.Empty);
            }


            foreach (var module in modulesFromDb)
                Distribute((module.ModuleFees * amount) / sumOfFees, module, recordToCreate);

            var response = new ResponseJson()
            {
                Data = null,
                Id = recordToCreate.Id,
                IsError = false,
                Msg = "Payment Receive Successs!"
            };

            try
            {
                __service.SaveChange();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private void Distribute(double amount, ModuleForFeeModel module, FeesModel payment)
        {
            var moduleFromDb = __service.GetEntity<Module>().FirstOrDefault(m => m.Id == module.Id);

            var teachersPart = Math.Ceiling((moduleFromDb.TeacherPercentange / 100) * amount);
            var coachingsPart = amount - teachersPart;

            var coachingAccountModel = new CoachingAccountModel()
            {
                Id = Guid.NewGuid(),
                ActivityId = Guid.Empty,
                Amount = coachingsPart,
                ChangeLog = null,
                CreatedAt = DateTime.Now,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false,
                Name = "AUTO_GENERATE",
                PeriodId = payment.PeriodId,
                Remarks = null,
                UpdatedAt = DateTime.Now,
                UpdatedBy = Guid.Empty,
                Total = amount,
                Percentage = 100 - moduleFromDb.TeacherPercentange,
                StudentId = payment.StudentId,
                PaymentId = payment.Id,
                ModuleId = moduleFromDb.Id
            };

            __service.Insert(__service.GetEntity<CoachingAccount>(), coachingAccountModel, Guid.Empty);

            var teacherFeeModel = new TeacherFeeModel()
            {
                Id = Guid.NewGuid(), 
                ActivityId = Guid.Empty,
                Fee = teachersPart,
                ChangeLog = null,
                CreatedAt = DateTime.Now,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false,
                Name = "AUTO_GENERATE",
                PeriodId = payment.PeriodId,
                Remarks = null,
                UpdatedAt = DateTime.Now,
                UpdatedBy = Guid.Empty,
                TeacherId = moduleFromDb.TeacherId,
                Total = amount,
                Percentage = moduleFromDb.TeacherPercentange,
                StudentId = payment.StudentId,
                PaymentId = payment.Id,
                ModuleId = moduleFromDb.Id
            };

            __service.Insert(__service.GetEntity<TeacherFee>(), teacherFeeModel, Guid.Empty);
        }


    }
}
