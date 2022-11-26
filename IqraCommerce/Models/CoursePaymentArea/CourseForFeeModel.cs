using System;

namespace IqraCommerce.Models.CoursePaymentArea
{
    public class CourseForFeeModel
    {
        public Guid Id { get; set; }
        public string PeriodName { get; set; }
        public double CourseFees { get; set; }
        public string CourseName { get; set; }
    }
}
