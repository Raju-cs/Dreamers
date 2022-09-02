using IqraCommerce.Entities.PaymentArea;
using IqraCommerce.Models.PaymentArea;
using IqraCommerce.Services.PaymentArea;

namespace IqraCommerce.Controllers.PaymentArea
{
    public class PaymentController: AppDropDownController<Payment, PaymentModel>
    {
        PaymentService ___service;

        public PaymentController()
        {
            service = __service = ___service = new PaymentService();
        }
    }
}
