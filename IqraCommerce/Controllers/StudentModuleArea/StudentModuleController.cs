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
using IqraCommerce.Helpers;
using IqraCommerce.Entities.BatchAttendanceArea;
using IqraCommerce.Entities.PeriodAttendanceArea;
using IqraCommerce.Entities.StudentResultArea;
using IqraCommerce.Entities.BatchExamArea;
using IqraCommerce.Entities.ModuleArea;
using IqraCommerce.Entities.PaymentHistoryArea;
using IqraCommerce.Models.PaymentHistoryArea;

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
            
            var getData = from getdata in modulePeriodList select new { getdata.Id};
            
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

            return base.Create(recordToCreate);
        }

        public ActionResult AddStudent([FromForm] StudentModuleModel recordToCreate)
        {

            var studentModuleEntity = ___service.GetEntity<StudentModule>();

            ModulePeriod modulePeriod = new ModulePeriod();
            Period period = new Period();

            var modulePeriodEntity = ___service.GetEntity<ModulePeriod>();
            var periodEntity = ___service.GetEntity<Period>();
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

            // add StudentDetails in StudentModule

            var batchForDB = ___service.GetEntity<Batch>().FirstOrDefault(exp => exp.Id == recordToCreate.BatchId 
                                                                                       && exp.ReferenceId == recordToCreate.ModuleId
                                                                                       && exp.IsDeleted == false);

            if (batchForDB != null)
            {
                StudentModule studentModule = new StudentModule()
                {
                    ActivityId = Guid.Empty,
                    Id = recordToCreate.Id,
                    StudentId = recordToCreate.StudentId,
                    ModuleId = recordToCreate.ModuleId,
                    BatchId = recordToCreate.BatchId,
                    Charge = batchForDB.Charge,
                    SubjectId = batchForDB.SubjectId,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    Remarks = null
                };
                studentModuleEntity.Add(studentModule);
            }


            var periodForDB = ___service.GetEntity<Period>().FirstOrDefault(p => p.IsDeleted == false);
            if (periodForDB != null)
            {
                var payment = new PaymentHistoryModel()
                {
                    Id = Guid.NewGuid(),
                    ActivityId = Guid.Empty,
                    StudentId = recordToCreate.StudentId,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    PeriodId = periodEntity.OrderByDescending(x => x.StartDate).FirstOrDefault().Id,
                    Charge = batchForDB.Charge,
                    Paid = 0,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };
                __service.Insert(__service.GetEntity<PaymentHistory>(), payment, Guid.Empty);
            }

           
            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }

            return Ok(new Response(batchForDB.Id, batchForDB, false, "Success"));
        }

        public  ActionResult EditStudent([FromForm] StudentModuleModel recordToCreate)
        {
            var batchForDB = ___service.GetEntity<Batch>().FirstOrDefault(exp => exp.Id == recordToCreate.BatchId
                                                                                        && exp.ReferenceId == recordToCreate.ModuleId
                                                                                        && exp.IsDeleted == false);

            recordToCreate.Charge = batchForDB.Charge;
            recordToCreate.SubjectId = batchForDB.SubjectId;
            return base.Edit(recordToCreate);
        }
    }
}
