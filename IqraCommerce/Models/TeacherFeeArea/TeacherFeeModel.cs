using System;
namespace IqraCommerce.Models.TeacherFeeArea
{
    public class TeacherFeeModel: AppDropDownBaseModel
    {
        public Guid PeriodId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid StudentId { get; set; }
        public Guid PaymentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid CourseId { get; set; }
        public double Fee { get; set; }
        public double Percentage { get; set; }
        public double Total { get; set; }
        public bool IsActive { get; set; }
    }
}
