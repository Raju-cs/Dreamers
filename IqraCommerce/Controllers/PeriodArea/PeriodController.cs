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
using IqraCommerce.Services.DemoArea;

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

        public override ActionResult Create([FromForm] PeriodModel  recordToCreate)
        {
            /*var modulePeriodList = ___service.GetEntity<ModulePeriod>();
            var StudentModuleAll = ___service.GetEntity<StudentModule>();


            modulePeriodList.FirstOrDefault().StudentModuleId = StudentModuleAll.FirstOrDefault().StudentId;
            modulePeriodList.FirstOrDefault().PriodId = recordToCreate.Id;*/
            return base.Create(recordToCreate );
        }

        public async Task<JsonResult> ForPayment(Page page)
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
