using IqraCommerce.Entities.CoursePeriodArea;
using IqraCommerce.Entities.PeriodArea;
using IqraCommerce.Entities.StudentCourseArea;
using IqraCommerce.Models.StudentCourseArea;
using IqraCommerce.Services.StudentCourseArea;
using Microsoft.AspNetCore.Mvc;
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
           
            return base.Create(recordToCreate);
        }
    }
}
