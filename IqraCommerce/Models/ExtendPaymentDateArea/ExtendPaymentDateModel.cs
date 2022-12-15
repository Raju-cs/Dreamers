using System;

namespace IqraCommerce.Models.ExtendPaymentDateArea
{
    public class ExtendPaymentDateModel: AppDropDownBaseModel
    {
        public Guid PeriodId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime ExtendPaymentdate { get; set; }
    }
}
