using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Models.StudentModuleArea;
using IqraCommerce.Services.StudentModuleArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Linq;
using IqraService.Search;
using IqraCommerce.Entities.ModulePeriodArea;
using System.Collections.Generic;
using IqraCommerce.Entities.PeriodArea;
using Microsoft.EntityFrameworkCore.Internal;

namespace IqraCommerce.Controllers.StudentModuleArea
{
    public class StudentModuleController: AppDropDownController<StudentModule, StudentModuleModel>
    {
        StudentModuleService ___service;

        public StudentModuleController()
        {
            service = __service = ___service = new StudentModuleService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

        public override ActionResult Create([FromForm] StudentModuleModel recordToCreate)
        {
            ModulePeriod modulePeriod = new ModulePeriod();
            Period period = new Period();
            var modulePeriodEntity = ___service.GetEntity<ModulePeriod>();
            var periodEntity = ___service.GetEntity<Period>();
            var studentModuleEntity = ___service.GetEntity<StudentModule>();
            List<ModulePeriod> modulePeriodList = new List<ModulePeriod>();
            StudentModule ListStudentModule = new StudentModule();
            List<Period> periodList = new List<Period>();

            modulePeriodList = modulePeriodEntity.Where(x => x.Id != ListStudentModule.Id).ToList();
            periodList = periodEntity.Where(x => x.IsDeleted == false && x.IsActive == true).ToList();
            var getPeriod = from getperiod in periodList select new { getperiod.Id };
            var getData = from getdata in modulePeriodList select new { getdata.Id };
            
            foreach (var studentmoduleId in getData)
            {
                modulePeriod = new ModulePeriod();
                modulePeriod.PriodId = periodList.FirstOrDefault().Id;
                modulePeriod.StudentModuleId = recordToCreate.Id;
                modulePeriodEntity.Add(modulePeriod);
            }
            
            return base.Create(recordToCreate);

        }

        public JsonResult Drop([FromForm] IdDto dto)
        {
            var studentModuleFromDb = ___service.Entity.FirstOrDefault(sm => sm.Id == dto.Id && !sm.IsDeleted);

            if (studentModuleFromDb == null)
            {
                return Json(new ResponseJson()
                {
                    Id = -3,
                    IsError = true,
                    Msg = "Student in the module not found!"
                });
            }

            studentModuleFromDb.IsDeleted = true;
         /*   studentModuleFromDb.DischargeDate = DateTime.Now;*/
           /* studentModuleFromDb.UpdatedAt = DateTime.Now;
            studentModuleFromDb.UpdatedBy = Guid.Empty;*/

            ___service.SaveChange();

            return Json(new ResponseJson()
            {
                Data = studentModuleFromDb,
                Id = dto.Id,
                IsError = false
            });
        }

    }

    public class IdDto
    {
        public Guid Id { get; set; }
        public Guid ActivityId { get; set; }
    }
}
