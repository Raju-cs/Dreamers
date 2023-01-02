using IqraCommerce.Entities.BatchArea;
using IqraCommerce.Entities.CoursePaymentHistoryArea;
using IqraCommerce.Entities.CoursePeriodArea;
using IqraCommerce.Entities.PeriodArea;
using IqraCommerce.Entities.StudentCourseArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.CoursePaymentHistoryArea;
using IqraCommerce.Models.StudentCourseArea;
using IqraCommerce.Services.StudentCourseArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IqraCommerce.Controllers.StudentCourseArea
{
    public class StudentCourseController: AppDropDownController<StudentCourse, StudentCourseModel>
    {
        StudentCourseService ___service;

        public StudentCourseController()
        {
            service = __service = ___service = new StudentCourseService();
        }
        public override ActionResult Create([FromForm] StudentCourseModel recordToCreate)
        {
            CoursePeriod coursePeriod = new CoursePeriod();
            Period period = new Period();
            var coursePeriodEntity = ___service.GetEntity<CoursePeriod>();
            var periodEntity = ___service.GetEntity<Period>();
            var studentCourseEntity = ___service.GetEntity<StudentCourse>();
            List<CoursePeriod> coursePeriodList = new List<CoursePeriod>();
            StudentCourse ListStudentCourse = new StudentCourse();
            List<Period> periodList = new List<Period>();

            coursePeriodList = coursePeriodEntity.Where(x => x.Id != ListStudentCourse.Id).ToList();
            var getData = from getdata in coursePeriodList select new { getdata.Id };
            foreach (var studentCourseId in getData)
            {
                coursePeriod.PriodId = periodEntity.OrderByDescending(x => x.StartDate).FirstOrDefault().Id;
                coursePeriod.StudentCourseId = recordToCreate.Id;
                coursePeriod.Name = period.Name;
                coursePeriodEntity.Add(coursePeriod);
            }

            var studentCourseFromDb = ___service.GetEntity<StudentCourse>()
                                         .FirstOrDefault(sc => sc.StudentId == recordToCreate.StudentId
                                                            && sc.IsDeleted == false
                                                            && sc.CourseId == recordToCreate.CourseId
                                                            && sc.BatchId == recordToCreate.BatchId);

            if (studentCourseFromDb != null)
                return Json(new Response(-4, null, true, "Student Already Exist!"));

            return base.Create(recordToCreate);
        }

        public ActionResult AddCourseStudent([FromForm] StudentCourseModel recordToCreate)
        {

            var studentModuleEntity = ___service.GetEntity<StudentCourse>();
            var batchForDB = ___service.GetEntity<Batch>().FirstOrDefault(exp => exp.Id == recordToCreate.BatchId
                                                                                       && exp.CourseId == recordToCreate.CourseId
                                                                                       && exp.IsDeleted == false);

            if (batchForDB != null)
            {
                StudentCourse studentCourse = new StudentCourse()
                {
                    ActivityId = Guid.Empty,
                    Id = Guid.NewGuid(),
                    StudentId = recordToCreate.StudentId,
                    CourseId = recordToCreate.CourseId,
                    BatchId = recordToCreate.BatchId,
                    CourseCharge = batchForDB.Charge,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    Remarks = null

                };
                studentModuleEntity.Add(studentCourse);

            }

            var periodEntity = ___service.GetEntity<Period>();
            var periodForDB = ___service.GetEntity<Period>().FirstOrDefault(p => p.IsDeleted == false);
            if (periodForDB != null)
            {
                var coursePayment = new CoursePaymentHistoryModel()
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
                __service.Insert(__service.GetEntity<CoursePaymentHistory>(), coursePayment, Guid.Empty);
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

        public ActionResult EditCourseStudent([FromForm] StudentCourseModel recordToCreate)
        {
            var batchForDB = ___service.GetEntity<Batch>().FirstOrDefault(exp => exp.Id == recordToCreate.BatchId
                                                                                        && exp.CourseId == recordToCreate.CourseId
                                                                                        && exp.IsDeleted == false);

            recordToCreate.CourseCharge = batchForDB.Charge;
            return base.Edit(recordToCreate);
        }
    }
}
