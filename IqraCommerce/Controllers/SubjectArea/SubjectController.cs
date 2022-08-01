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
    }
}
