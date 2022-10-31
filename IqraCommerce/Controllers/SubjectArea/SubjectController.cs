using IqraCommerce.Entities.SubjectArea;
using IqraCommerce.Models.SubjectArea;
using IqraCommerce.Services.SubjectArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.SubjectArea
{
    public class SubjectController: AppDropDownController<Subject, SubjectModel>
    {
        SubjectService ___service;
        public SubjectController()
        {
            service = __service = ___service = new SubjectService();
        }
        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }

        public override ActionResult Create([FromForm] SubjectModel recordToCreate)
        {
            recordToCreate.Name = recordToCreate.SearchName + " " + recordToCreate.Class + " " + recordToCreate.Version;
            return base.Create(recordToCreate);
        }

        public override ActionResult Edit([FromForm] SubjectModel recordToCreate)
        {
            recordToCreate.Name = recordToCreate.SearchName + " " + recordToCreate.Class + " " + recordToCreate.Version;
            return base.Edit(recordToCreate);
        }
    }
}
