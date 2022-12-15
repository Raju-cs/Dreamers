using IqraCommerce.Entities.LocationArea;
using IqraCommerce.Models.LocationArea;
using IqraCommerce.Services.LocationArea;


namespace IqraCommerce.Controllers.LocationArea
{
    public class DistrictController: AppDropDownController<District, DistrictModel>
    {
        DistrictService ___service;

        public DistrictController()
        {
            service = __service = ___service = new DistrictService();
        }

    }
}
