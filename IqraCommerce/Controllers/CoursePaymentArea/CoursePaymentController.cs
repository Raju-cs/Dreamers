using IqraCommerce.Entities.CoachingAccountArea;
using IqraCommerce.Entities.CourseArea;
using IqraCommerce.Entities.CoursePaymentArea;
using IqraCommerce.Entities.CourseSubjectTeacherArea;
using IqraCommerce.Entities.TeacherFeeArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.CoachingAccountArea;
using IqraCommerce.Models.CoursePaymentArea;
using IqraCommerce.Models.TeacherFeeArea;
using IqraCommerce.Services.CoursePaymentArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.CoursePaymentArea
{
    public class CoursePaymentController: AppDropDownController<CoursePayment, CoursePaymentModel>
    {
        CoursePaymentService ___service;

        public CoursePaymentController()
        {
            service = __service = ___service = new CoursePaymentService();
        }

        public async Task<JsonResult> TotalCourseFee([FromBody] Page page)
        {
            return Json(await ___service.TotalCourseFee(page));
        }
        public async Task<IActionResult> PayCourseFees([FromForm] CoursePaymentModel recordToCreate)
        {
            var amount = recordToCreate.Paid;
            var coursesFromDb = await ___service.GetCourses(recordToCreate.StudentId, recordToCreate.PeriodId);

            var sumOfFees = coursesFromDb.Sum(c => c.CourseFees);

            var payments = ___service.GetEntity<CoursePayment>().Where(c=> c.IsDeleted == false && c.StudentId == recordToCreate.StudentId && c.PeriodId == recordToCreate.PeriodId);

            var sumOfPaid = payments.Sum(f => f.Paid);

            recordToCreate.Name = "Course";
            recordToCreate.PaymentDate = DateTime.Now;

            if (payments != null)
            {
                var coursePaid = sumOfPaid + recordToCreate.Paid;

                if (sumOfFees >= amount && sumOfFees >= coursePaid)
                {
                    __service.Insert(recordToCreate, Guid.Empty);
                }
                else
                {
                    return Json(new Response(-4, null, true, "Paymnet Over"));
                }
            }
            else
            {
                __service.Insert(recordToCreate, Guid.Empty);
            }

            foreach (var course in coursesFromDb)
                Distribute((course.CourseFees * amount) / sumOfFees, course, recordToCreate);

            var response = new ResponseJson()
            {
                Data = null,
                Id = recordToCreate.Id,
                IsError = false,
                Msg = "Payment Receive Successs!"
            };

            try
            {
                __service.SaveChange();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        private void Distribute(double amount, CourseForFeeModel course, CoursePaymentModel payment)
        {
            var courseSubjectTeacherFromDB = __service.GetEntity<CourseSubjectTeacher>().Where(cst => cst.CourseId == course.Id ).ToList();
            foreach(var courseSubjectTeacher in courseSubjectTeacherFromDB)
            {
                var courseTeacherPart = Math.Ceiling((courseSubjectTeacher.TeacherPercentange / 100 ) * amount);

                var teacherFeeModel = new TeacherFeeModel()
                {
                    Id = Guid.NewGuid(),
                    ActivityId = Guid.Empty,
                    Fee = courseTeacherPart,
                    ChangeLog = null,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    IsActive = true,
                    IsDeleted = false,
                    Name = "Course",
                    Remarks = null,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    Total = amount,
                    PeriodId = payment.PeriodId,
                    Percentage = courseSubjectTeacher.TeacherPercentange,
                    TeacherId = courseSubjectTeacher.TeacherId,
                    StudentId = payment.StudentId,
                    PaymentId = payment.Id,
                    CourseId = courseSubjectTeacher.CourseId
                };

                __service.Insert(__service.GetEntity<TeacherFee>(), teacherFeeModel, Guid.Empty);
            }

            var forCoachingCourseSubjectTeacherFromDB = __service.GetEntity<CourseSubjectTeacher>().FirstOrDefault(cst => cst.CourseId == course.Id);

            var totalTeacherPerctange = courseSubjectTeacherFromDB.Sum(cst => cst.TeacherPercentange);
            var correctParcentange = Math.Ceiling((totalTeacherPerctange / 100) * amount);
            var coachingPart = amount - correctParcentange;

            var coachingAccountModel = new CoachingAccountModel()
            {
                Id = Guid.NewGuid(),
                ActivityId = Guid.Empty,
                Amount = coachingPart,
                ChangeLog = null,
                CreatedAt = DateTime.Now,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false,
                Name = "Course",
                Remarks = null,
                UpdatedAt = DateTime.Now,
                UpdatedBy = Guid.Empty,
                Total = amount,
                Percentage = 100 - totalTeacherPerctange,
                PeriodId = payment.PeriodId,
                StudentId = payment.StudentId,
                PaymentId = payment.Id,
                CourseId = forCoachingCourseSubjectTeacherFromDB.CourseId,
            };
            __service.Insert(__service.GetEntity<CoachingAccount>(), coachingAccountModel, Guid.Empty);
        }

        }
}
