using System;
namespace IqraCommerce.Models.CoachingAccountArea
{
    public class CoachingAccountModel: AppDropDownBaseModel
    {
        public Guid PeriodId { get; set; }
        public bool IsActive { get; set; }
    }
}
