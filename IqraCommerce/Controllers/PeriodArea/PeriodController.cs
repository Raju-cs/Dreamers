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
using IqraCommerce.Entities.StudentCourseArea;
using IqraCommerce.Entities.CoursePeriodArea;
using IqraCommerce.Entities.FeesArea;
using IqraCommerce.Models.FeesArea;

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
            var coursePeriodList = ___service.GetEntity<CoursePeriod>();
            var studentModuleList = ___service.GetEntity<StudentModule>();
            var studentCourseList = ___service.GetEntity<StudentCourse>();
            List<StudentModule> ListStudentModule = new List<StudentModule>();
            List<StudentCourse> ListStudentCourse = new List<StudentCourse>();

            Period period = new Period();

            ListStudentModule = studentModuleList.Where(x => x.IsDeleted == false ).ToList();
            var getData = from getdata in ListStudentModule select new {getdata.Id, getdata.StudentId};
            
            foreach(var module in getData)
            { 
                modulePeriod = new ModulePeriod();
                modulePeriod.StudentModuleId = module.Id;
                modulePeriod.PriodId = recordToCreate.Id;
                modulePeriodList.Add(modulePeriod);
            }

            var studentCourseDB = ___service.GetEntity<StudentCourse>().Where(sc=> sc.IsDeleted == false).ToList(); 

            foreach(var studentCourse in studentCourseDB)
            {
                CoursePeriod coursePeriod = new CoursePeriod();
                coursePeriod.StudentCourseId = studentCourse.Id;
                coursePeriod.PriodId = recordToCreate.Id;
                coursePeriodList.Add(coursePeriod);
            }

            return base.Create(recordToCreate);
        }

        [HttpPost]
        public async Task<JsonResult> ForModulePayment([FromBody] Page page)
        {
            return Json(await ___service.ForModulePayment(page));
        }

        public async Task<JsonResult> ForCoursePayment([FromBody] Page page)
        {
            return Json(await ___service.ForCoursePayment(page));
        }
    }

    public class IdDto
    {
        public Guid Id { get; set; }
        public Guid ActivityId { get; set; }
    }
}
