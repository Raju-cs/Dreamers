using System;
namespace IqraCommerce.Models.FeesArea
{
    public class FeesModel: AppDropDownBaseModel
    {
        public Guid PeriodId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime ExtendPaymentDate { get; set; }
        public double Fee { get; set; }
        public double TotalFee { get; set; }
        public double CourseFee { get; set; }
        public double ModuleFee { get; set; }
        public double RestFee { get; set; }
        public double PaidFee { get; set; }
        public bool IsActive { get; set; }
    }
}
