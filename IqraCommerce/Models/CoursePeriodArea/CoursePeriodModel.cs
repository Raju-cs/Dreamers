using System;
namespace IqraCommerce.Models.CoursePeriodArea
{
    public class CoursePeriodModel: AppDropDownBaseModel
    {
        public Guid PriodId { get; set; }
        public Guid StudentCourseId { get; set; }
    }
}
