using IqraCommerce.Entities.BatchExamArea;
using IqraCommerce.Entities.StudentMessageStatusArea;
using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Entities.StudentResultArea;
using IqraCommerce.Models.BatchExamArea;
using IqraCommerce.Services.BatchExamArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.BatchExamArea
{
    public class BatchExamController: AppDropDownController<BatchExam, BatchExamModel>
    {
        BatchExamService ___service;

        public BatchExamController()
        {
            service = __service = ___service = new BatchExamService();
        }

        public override ActionResult Create([FromForm] BatchExamModel recordToCreate)
        {
            var studentModuleEntity = ___service.GetEntity<StudentModule>();
            var studentResultEntity = ___service.GetEntity<StudentResult>();
            var studentMessageStatusEntity = ___service.GetEntity<StudentMessageStatus>();


            var students = studentModuleEntity.Where(sm => sm.BatchId == recordToCreate.BatchId && sm.ModuleId == recordToCreate.ModuleId && sm.IsDeleted == false).ToList();


            foreach (var student in students)
            {
                StudentResult studentResult = new StudentResult()
                {

                    ActivityId = Guid.Empty,
                    BatchId = student.BatchId,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    ModuleId = student.ModuleId,
                    StudentId = student.StudentId,
                    SubjectId = recordToCreate.SubjectId,
                    BatchExamId = recordToCreate.Id,
                    ExamDate = recordToCreate.ExamDate,
                    Status = "Absent",
                    Mark = 0,
                    Name = recordToCreate.Name,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };

                studentResultEntity.Add(studentResult);
            }


            foreach(var student in students)
            {
                StudentMessageStatus studentMessaageStatus = new StudentMessageStatus()
                {
                    ActivityId = Guid.Empty,
                    BatchId = student.BatchId,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    ModuleId = student.ModuleId,
                    StudentId = student.StudentId,
                    SubjectId = recordToCreate.SubjectId,
                    MessageId = Guid.Empty,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };
                studentMessageStatusEntity.Add(studentMessaageStatus);
            }


            ___service.SaveChange();

            return base.Create(recordToCreate);
        }

        public async Task<JsonResult> ModuleBatchExamStudent([FromBody] Page page)
        {
            return Json(await ___service.ModuleBatchExamStudent(page));
        }
    }
}
