using IqraCommerce.Entities.ModulePeriodArea;
using IqraCommerce.Models.ModulePeriodArea;
using IqraCommerce.Services.DemoArea;

namespace IqraCommerce.Controllers.DemoArea
{
    public class ModulePeriodController: AppDropDownController<ModulePeriod, ModulePeriodModel>
    {
        ModulePeriodService ___service;

        public ModulePeriodController()
        {
            service = __service = ___service = new ModulePeriodService();
        }
    }
}
