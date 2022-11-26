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
using IqraCommerce.Entities.BatchAttendanceArea;
using IqraCommerce.Entities.PeriodAttendanceArea;
using IqraCommerce.Entities.StudentResultArea;
using IqraCommerce.Entities.BatchExamArea;

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
                                                            && sm.ModuleId == recordToCreate.ModuleId
                                                            && sm.BatchId == recordToCreate.BatchId);

            if(studentModuleFromDb != null)
                return Json(new Response(-4, null, true, "Student Already Exist!"));



            // add student in BatchAttendance table
            
            var batchAttendanceEntity = ___service.GetEntity<BatchAttendance>();

            var periodAttendanceDb = ___service.GetEntity<PeriodAttendance>().Where(pa => pa.BatchId == recordToCreate.BatchId 
                                                                                             && pa.IsDeleted == false).ToList();
            var getPeriodAttendance = from getdata in periodAttendanceDb select new { getdata.Id, getdata.BatchId, getdata.RoutineId};
            foreach (var item in getPeriodAttendance)
            {
                BatchAttendance batchAttendance = new BatchAttendance()
                {
                    AttendanceTime = null,
                    EarlyLeaveTime = null,
                    ActivityId = Guid.Empty,
                    BatchId = item.BatchId,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    ModuleId = recordToCreate.ModuleId,
                    StudentId = recordToCreate.StudentId,
                    RoutineId = item.RoutineId,
                    Status = "Absent",
                    PeriodAttendanceId = item.Id,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };

                batchAttendanceEntity.Add(batchAttendance);
            }


            //___service.SaveChange();

            // Add student in StudentResult table

            var studentResultEntity = ___service.GetEntity<StudentResult>();

            var batchExamDB = ___service.GetEntity<BatchExam>().Where(be => be.ModuleId == recordToCreate.ModuleId
                                                                                      && be.BatchId == recordToCreate.BatchId
                                                                                      && be.SubjectId == recordToCreate.SubjectId
                                                                                      && be.IsDeleted == false).ToList();



            var getBatchExam = from getExam in batchExamDB select new { getExam.ModuleId, getExam.BatchId, getExam.SubjectId, getExam.Id };
            foreach (var batchExamItem in getBatchExam)
            {
                StudentResult studentResult = new StudentResult()
                {
                    Status = "Absent",
                    Mark = 0, 
                    ActivityId = Guid.Empty,
                    BatchId = batchExamItem.BatchId,
                    ModuleId = batchExamItem.ModuleId,
                    StudentId = recordToCreate.StudentId,
                    SubjectId = batchExamItem.SubjectId,
                    BatchExamId = batchExamItem.Id,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };
                studentResultEntity.Add(studentResult);
            }
            ___service.SaveChange();

            return  base.Create(recordToCreate);
        }
    }
}
