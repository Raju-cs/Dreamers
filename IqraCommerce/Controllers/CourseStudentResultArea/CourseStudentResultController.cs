using IqraCommerce.Entities.CourseStudentResultArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.CourseStudentResultArea;
using IqraCommerce.Services.CourseStudentResultArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace IqraCommerce.Controllers.CourseStudentResultArea
{
    public class CourseStudentResultController: AppDropDownController<CourseStudentResult, CourseStudentResultModel>
    {
        CourseStudentResultService ___service;

        public CourseStudentResultController()
        {
            service = __service = ___service = new CourseStudentResultService();
        }

        public ActionResult Mark([FromForm] CourseStudentResultModel recordToCreate)
        {

            var courseStudentResultForDb = ___service.GetEntity<CourseStudentResult>().FirstOrDefault(csr => csr.IsDeleted == false
                                                                                                  && csr.StudentId == recordToCreate.StudentId
                                                                                                  && csr.CourseId == recordToCreate.CourseId
                                                                                                  && csr.BatchId == recordToCreate.BatchId);


            courseStudentResultForDb.Status = "Present";
            courseStudentResultForDb.Mark = recordToCreate.Mark;


            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }


            return Ok(new Response(courseStudentResultForDb.Id, courseStudentResultForDb, false, "Success"));
        }
    }
}
