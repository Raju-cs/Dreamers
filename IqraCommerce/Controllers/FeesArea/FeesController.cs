using IqraCommerce.Entities.FeesArea;
using IqraCommerce.Models.FeesArea;
using IqraCommerce.Services.FeesArea;

namespace IqraCommerce.Controllers.FeesArea
{
    public class FeesController : AppDropDownController<Fees, FeesModel>
    {
        FeesService ___service;

        public FeesController()
        {
            service = __service = ___service = new FeesService();
        }
    }
}
