using IqraCommerce.Entities.CourseAttendanceDateArea;
using IqraCommerce.Entities.CourseBatchAttendanceArea;
using IqraCommerce.Entities.StudentCourseArea;
using IqraCommerce.Models.CourseAttendanceDateArea;
using IqraCommerce.Services.CourseAttendanceDateArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.CourseAttendanceDateArea
{
    public class CourseAttendanceDateController: AppDropDownController<CourseAttendanceDate, CourseAttendanceDateModel>
    {
        CourseAttendanceDateService ___service;

        public CourseAttendanceDateController()
        {
            service = __service = ___service = new CourseAttendanceDateService();
        }

        public override ActionResult Create([FromForm] CourseAttendanceDateModel recordToCreate)
        {

            var studentCourseEntity = ___service.GetEntity<StudentCourse>();
            var courseBatchAttendanceEntity = ___service.GetEntity<CourseBatchAttendance>();

            var courseStudents = studentCourseEntity.Where(sc => sc.BatchId == recordToCreate.BatchId && sc.IsDeleted == false).ToList();

            foreach(var courseStudent in courseStudents)
            {
                CourseBatchAttendance courseBatchAttendance = new CourseBatchAttendance()
                {
                    AttendanceTime = null,
                    EarlyLeaveTime = null,
                    ActivityId = Guid.Empty,
                    BatchId = courseStudent.BatchId,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    CourseId = courseStudent.CourseId,
                    StudentId = courseStudent.StudentId,
                    Status = "Absent",
                    CourseAttendanceDateId = recordToCreate.Id,
                    RoutineId = recordToCreate.RoutineId,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };

                courseBatchAttendanceEntity.Add(courseBatchAttendance);
            }

            ___service.SaveChange();

            return base.Create(recordToCreate);
        }

        public async Task<JsonResult> CourseBatchStudent([FromBody] Page page)
        {
            return Json(await ___service.CourseBatchStudent(page));
        }
    }
}
