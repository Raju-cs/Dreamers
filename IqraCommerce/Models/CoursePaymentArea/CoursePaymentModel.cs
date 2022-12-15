using System;

namespace IqraCommerce.Models.CoursePaymentArea
{
    public class CoursePaymentModel: AppDropDownBaseModel
    {
        public Guid PeriodId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public double Paid { get; set; }
        public bool IsActive { get; set; }
    }
}
