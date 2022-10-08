using IqraCommerce.Entities.PeriodArea;
using IqraCommerce.Models.PeriodArea;
using IqraCommerce.Services.PeriodArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using IqraService.Search;
using System.Linq;
using IqraCommerce.Entities.ModulePeriodArea;
using IqraCommerce.Entities.StudentModuleArea;
using System.Collections.Generic;

namespace IqraCommerce.Controllers.PeriodArea
{
    public class PeriodController: AppDropDownController<Period, PeriodModel>
    {
        PeriodService ___service;

        public PeriodController()
        {
            service = __service = ___service = new PeriodService();
        }

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

        // Add Data in ModulePeriod Table
        public override ActionResult Create([FromForm] PeriodModel  recordToCreate)
        {
            ModulePeriod modulePeriod = new ModulePeriod();
            var modulePeriodList = ___service.GetEntity<ModulePeriod>();
            var studentModuleList = ___service.GetEntity<StudentModule>();
            List<StudentModule> ListStudentModule = new List<StudentModule>();
            Period period = new Period();

            ListStudentModule = studentModuleList.Where(x => x.IsDeleted == false ).ToList();
            var getData = from getdata in ListStudentModule select new {getdata.Id};
            
            foreach(var module in getData)
            {
                modulePeriod = new ModulePeriod();
                modulePeriod.StudentModuleId = module.Id;
                modulePeriod.PriodId = recordToCreate.Id;
                modulePeriodList.Add(modulePeriod);
            }
            return base.Create(recordToCreate);
        }

        [HttpPost]
        public async Task<JsonResult> ForPayment([FromBody] Page page)
        {
            return Json(await ___service.ForPayment(page));
        }
    }

    public class IdDto
    {
        public Guid Id { get; set; }
        public Guid ActivityId { get; set; }
    }
}
