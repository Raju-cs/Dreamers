using IqraCommerce.Entities.CourseExamsArea;
using IqraCommerce.Entities.CourseStudentResultArea;
using IqraCommerce.Entities.StudentCourseArea;
using IqraCommerce.Models.CourseExamsArea;
using IqraCommerce.Services.CourseExamsArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.CourseExamArea
{
    public class CourseExamsController : AppDropDownController<CourseExams, CourseExamsModel>
    {
        CourseExamsService ___service;

        public CourseExamsController()
        {
            service = __service = ___service = new CourseExamsService();
        }


        public override ActionResult Create([FromForm] CourseExamsModel recordToCreate)
        {
            var studentCourseEntity = ___service.GetEntity<StudentCourse>();
            var courseStudentResultEntity = ___service.GetEntity<CourseStudentResult>();


            var students = studentCourseEntity.Where(sm => sm.BatchId == recordToCreate.BatchId && sm.CourseId == recordToCreate.CourseId && sm.IsDeleted == false).ToList();


            foreach (var student in students)
            {
                CourseStudentResult courseStudentResult = new CourseStudentResult()
                {

                    ActivityId = Guid.Empty,
                    BatchId = student.BatchId,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    CourseId = student.CourseId,
                    StudentId = student.StudentId,
                    SubjectId = recordToCreate.SubjectId,
                    CourseExamsId = recordToCreate.Id,
                    Status = "Absent",
                    Mark = 0,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };

                courseStudentResultEntity.Add(courseStudentResult);
            }


            ___service.SaveChange();

            return base.Create(recordToCreate);
        }

        public async Task<JsonResult> CourseBatchExamStudent([FromBody] Page page)
        {
            return Json(await ___service.CourseBatchExamStudent(page));
        }
    }
}
