using IqraCommerce.Entities.BatchAttendanceArea;
using IqraCommerce.Entities.PeriodAttendanceArea;
using IqraCommerce.Entities.RoutineArea;
using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Models.PeriodAttendanceArea;
using IqraCommerce.Services.PeriodAttendanceArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.PeriodAttendanceArea
{
    public class PeriodAttendanceController : AppDropDownController<PeriodAttendance, PeriodAttendanceModel>
    {
        PeriodAttendanceService ___service;

        public PeriodAttendanceController()
        {
            service = __service = ___service = new PeriodAttendanceService();
        }

        public override ActionResult Create([FromForm] PeriodAttendanceModel recordToCreate)
        {
            var studentModuleEntity = ___service.GetEntity<StudentModule>();
            var batchAttendanceEntity = ___service.GetEntity<BatchAttendance>();

            Routine routine = new Routine();

            var students = studentModuleEntity.Where(sm => sm.BatchId == recordToCreate.BatchId && sm.IsDeleted == false).ToList();


            foreach (var student in students)
            {
                BatchAttendance batchAttendance = new BatchAttendance()
                {
                    AttendanceTime = null,
                    EarlyLeaveTime = null,
                    ActivityId = Guid.Empty,
                    BatchId = student.BatchId,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    ModuleId = student.ModuleId,
                    StudentId = student.StudentId,
                    Status = "Absent",
                    PeriodAttendanceId = recordToCreate.Id,
                    RoutineId = recordToCreate.RoutineId,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };

                batchAttendanceEntity.Add(batchAttendance);
            }


            ___service.SaveChange();

            return base.Create(recordToCreate);
        }
            
            public async Task<JsonResult> BatchStudent([FromBody] Page page)
            {
            return Json(await ___service.BatchStudent(page));
            }
    }
}
