using System;

namespace IqraCommerce.Models.CoursePaymentHistoryArea
{
    public class CoursePaymentHistoryModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid PeriodId { get; set; }
        public double Charge { get; set; }
        public double Paid { get; set; }
    }
}
