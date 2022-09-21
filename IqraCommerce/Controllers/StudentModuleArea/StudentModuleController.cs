using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Models.StudentModuleArea;
using IqraCommerce.Services.StudentModuleArea;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Linq;
using IqraService.Search;

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

        public JsonResult Drop([FromForm] IdDto dto)
        {
            var studentModuleFromDb = ___service.Entity.FirstOrDefault(sm => sm.Id == dto.Id && !sm.IsDeleted);

            if (studentModuleFromDb == null)
            {
                return Json(new ResponseJson()
                {
                    Id = -3,
                    IsError = true,
                    Msg = "Student in the module not found!"
                });
            }

            studentModuleFromDb.IsDeleted = true;
         /*   studentModuleFromDb.DischargeDate = DateTime.Now;*/
           /* studentModuleFromDb.UpdatedAt = DateTime.Now;
            studentModuleFromDb.UpdatedBy = Guid.Empty;*/

            ___service.SaveChange();

            return Json(new ResponseJson()
            {
                Data = studentModuleFromDb,
                Id = dto.Id,
                IsError = false
            });
        }

    }

    public class IdDto
    {
        public Guid Id { get; set; }
        public Guid ActivityId { get; set; }
    }
}
