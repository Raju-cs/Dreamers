using IqraCommerce.Entities.CourseRoutineArea;
using IqraCommerce.Entities.CourseSubjectTeacherArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.CourseRoutineArea;
using IqraCommerce.Services.CourseRoutineArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace IqraCommerce.Controllers.CourseRoutineArea
{
    public class CourseRoutineController: AppDropDownController<CourseRoutine, CourseRoutineModel>
    {

        CourseRoutineService ___service;

        public CourseRoutineController()
        {
            service = __service = ___service = new CourseRoutineService();
        }

        public ActionResult CourseRoutine([FromForm] CourseRoutineModel recordToCreate)
        {


            var courseRoutineEntity = ___service.GetEntity<CourseRoutine>();
            var courseSubjectTeacherDB = ___service.GetEntity<CourseSubjectTeacher>().Where(cst => cst.CourseId == recordToCreate.CourseId);

            foreach (var courseSubject in courseSubjectTeacherDB)
            {
                CourseRoutine courseRoutine = new CourseRoutine()
                {
                    ActivityId = Guid.Empty,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    Name = recordToCreate.Name,
                    ClassRoomNumber = recordToCreate.ClassRoomNumber,
                    Program = "Course",
                    StartTime = recordToCreate.StartTime,
                    EndTime = recordToCreate.EndTime,
                    TeacherId = courseSubject.TeacherId,
                    CourseId = courseSubject.CourseId,
                    BatchId = recordToCreate.BatchId,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Remarks = null
                };
                courseRoutineEntity.Add(courseRoutine);
            }


            ___service.SaveChange();




            return Ok(new Response(courseSubjectTeacherDB, courseSubjectTeacherDB, false, "Success"));
        }

    }
}
