using System;
namespace IqraCommerce.Models.CoachingAccountArea
{
    public class CoachingAccountModel: AppDropDownBaseModel
    {
        public Guid PeriodId { get; set; }
        public Guid StudentId { get; set; }
        public Guid PaymentId { get; set; }
        public Guid ModuleId { get; set; }
        public double Amount { get; set; }
        public double Percentage { get; set; }
        public double Total { get; set; }
        public bool IsActive { get; set; }
    }
}
