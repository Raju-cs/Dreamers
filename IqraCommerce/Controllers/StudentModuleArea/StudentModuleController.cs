using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Models.StudentModuleArea;
using IqraCommerce.Services.StudentModuleArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Linq;
using IqraCommerce.Entities.ModulePeriodArea;
using System.Collections.Generic;
using IqraCommerce.Entities.PeriodArea;
using IqraCommerce.Entities.BatchArea;
using IqraCommerce.Entities.StudentArea;
using IqraCommerce.Helpers;

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
            var batchEntity = ___service.GetEntity<Batch>();

            StudentModule ListStudentModule = new StudentModule();
            List<ModulePeriod> modulePeriodList = new List<ModulePeriod>();
            List<Period> periodList = new List<Period>();

            modulePeriodList = modulePeriodEntity.Where(x => x.Id != ListStudentModule.Id).ToList();
            
            var getData = from getdata in modulePeriodList select new { getdata.Id };
            
            foreach (var studentmoduleId in getData)
            {
                    modulePeriod.PriodId = periodEntity.OrderByDescending(x => x.StartDate).FirstOrDefault().Id;
                    modulePeriod.StudentModuleId = recordToCreate.Id;
                    modulePeriod.Name = period.Name;
                    modulePeriodEntity.Add(modulePeriod);
            }

            var studentModuleFromDb = ___service.GetEntity<StudentModule>()
                                         .FirstOrDefault(sm => sm.StudentId == recordToCreate.StudentId
                                                            && sm.IsDeleted == false
                                                            && sm.ModuleId == recordToCreate.ModuleId);

            if(studentModuleFromDb != null)
                return Json(new Response(-4, null, true, "Student Already Exist!"));
            
            return  base.Create(recordToCreate);
        }
    }
}
