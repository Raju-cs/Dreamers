using IqraCommerce.Entities.TeacherArea;
using IqraCommerce.Models.TeacherArea;
using IqraCommerce.Services.TeacherArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.TeacherArea
{
    public class TeacherController: AppDropDownController<Teacher, TeacherModel>
    {
        TeacherService ___service;

        public TeacherController()
        {
            service = __service = ___service = new TeacherService();
        }
        public async Task<JsonResult> BasicInfo([FromQuery] Guid id)
        {
            return Json(await ___service.BasicInfo(id));
        }
        public override async Task<JsonResult> AutoComplete(Page page)
        {
            return Json(await ___service.AutoComplete(page));
        }
    }
}
