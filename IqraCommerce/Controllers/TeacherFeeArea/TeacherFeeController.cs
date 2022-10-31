using IqraCommerce.Entities.TeacherFeeArea;
using IqraCommerce.Models.TeacherFeeArea;
using IqraCommerce.Services.TeacherFeeArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.TeacherFeeArea
{
    public class TeacherFeeController: AppDropDownController<TeacherFee, TeacherFeeModel>
    {
        TeacherFeeService ___service;

        public TeacherFeeController()
        {
            service = __service = ___service = new TeacherFeeService();
        }

        public async Task<JsonResult> TeacherAmount([FromBody] Page page)
        {
            return Json(await ___service.TeacherAmount(page));
        }
    }
}
