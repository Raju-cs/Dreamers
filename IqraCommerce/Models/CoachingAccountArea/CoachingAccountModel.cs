using System;
namespace IqraCommerce.Models.CoachingAccountArea
{
    public class CoachingAccountModel: AppDropDownBaseModel
    {
        public Guid ModuleId { get; set; }
        public Guid StudentId { get; set; }
        public Guid BatchId { get; set; }
        public double ModuleIncome { get; set; }
        public double CourseIncome { get; set; }
        public bool IsActive { get; set; }
    }
}
