using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using IqraCommerce.Models.ModuleArea;
using IqraCommerce.Entities.ModuleArea;
using IqraCommerce.Services.ModuleArea;
using IqraCommerce.Entities.SubjectArea;
using System.Collections.Generic;
using System.Linq;
using IqraCommerce.Helpers;

namespace IqraCommerce.Controllers.ModuleArea
{
    public class ModuleController : AppDropDownController<Module, ModuleModel>
    {
        ModuleService ___service;

        public ModuleController()
        {
            service = __service = ___service = new ModuleService();
        }

        public ActionResult AddModule([FromForm] ModuleModel recordToCreate)
        {

            var moduleEntity = ___service.GetEntity<Module>();
            var subjectForDb = ___service.GetEntity<Subject>().FirstOrDefault(s => s.IsDeleted == false
                                                                                                  && s.Id == recordToCreate.SubjectId);


            if(subjectForDb != null)
            {
                Module module = new Module()
                {
                    ActivityId = Guid.Empty,
                    Id = Guid.NewGuid(),
                    TeacherId = recordToCreate.TeacherId,
                    SubjectId = recordToCreate.SubjectId,
                    TeacherPercentange = recordToCreate.TeacherPercentange,
                    Name = recordToCreate.Name,
                    ChargePerStudent = recordToCreate.ChargePerStudent,
                    IsActive = recordToCreate.IsActive,
                    Class = subjectForDb.Class,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = Guid.Empty,
                    CreatedAt = DateTime.Now,
                    CreatedBy = Guid.Empty,
                    Remarks = null
                };
                moduleEntity.Add(module);
            }



            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }


            return Ok(new Response(subjectForDb.Id, subjectForDb, false, "Success"));
        }

        public override ActionResult Edit([FromForm] ModuleModel recordToCreate)
        {
            var subjectForDb = ___service.GetEntity<Subject>().FirstOrDefault(s => s.IsDeleted == false
                                                                                                 && s.Id == recordToCreate.SubjectId);

            recordToCreate.Class = subjectForDb.Class;
            return base.Edit(recordToCreate);
        }


        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }
    }
}
