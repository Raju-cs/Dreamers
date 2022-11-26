using IqraCommerce.Entities.CourseSubjectTeacherArea;
using IqraCommerce.Entities.RoutineArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.RoutineArea;
using IqraCommerce.Services.RoutineArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.RoutineArea
{
    public class RoutineController: AppDropDownController<Routine, RoutineModel>
    {
        RoutineService ___service;

        public RoutineController()
        {
            service = __service = ___service = new RoutineService();
        }

        public override ActionResult Create([FromForm] RoutineModel recordToCreate)
        {


            var routineFromDb = ___service.GetEntity<Routine>()
                                         .FirstOrDefault(r => r.TeacherId == recordToCreate.TeacherId
                                                            && r.IsDeleted == false
                                                            && (r.StartTime >= recordToCreate.StartTime || r.EndTime >= recordToCreate.EndTime)
                                                            && (r.StartTime <= recordToCreate.StartTime || r.EndTime >= recordToCreate.EndTime)
                                                            && r.Name == recordToCreate.Name);

            if (routineFromDb != null)
                return Json(new Response(-4, null, true, "Already Exist!"));


            return base.Create(recordToCreate);
        }


        

        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

    }
}
