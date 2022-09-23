using IqraCommerce.Entities.DemoArea;
using IqraCommerce.Models.DemoArea;
using IqraCommerce.Services.DemoArea;

namespace IqraCommerce.Controllers.DemoArea
{
    public class DemoController: AppDropDownController<Demo, DemoModel>
    {
        DemoService ___service;

        public DemoController()
        {
            service = __service = ___service = new DemoService();
        }
    }
}
