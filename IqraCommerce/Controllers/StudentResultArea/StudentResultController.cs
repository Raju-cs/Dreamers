using IqraCommerce.Entities.StudentResultArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.StudentResultArea;
using IqraCommerce.Services.StudentResultArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.StudentResultArea
{
    public class StudentResultController : AppDropDownController<StudentResult, StudentResultModel>
    {
        StudentResultService ___service;

        public StudentResultController()
        {
            service = __service = ___service = new StudentResultService();
        }

         public ActionResult Mark([FromForm] StudentResultModel recordToCreate)
        {

            var studentResultForDb = ___service.GetEntity<StudentResult>().FirstOrDefault(sr => sr.IsDeleted == false
                                                                                                  && sr.StudentId == recordToCreate.StudentId
                                                                                                  && sr.ModuleId == recordToCreate.ModuleId
                                                                                                  && sr.BatchId == recordToCreate.BatchId);


            studentResultForDb.Status = "Present";
            studentResultForDb.Mark = recordToCreate.Mark;



            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }


            return Ok(new Response(studentResultForDb.Id, studentResultForDb, false, "Success"));
        }
    }
}
