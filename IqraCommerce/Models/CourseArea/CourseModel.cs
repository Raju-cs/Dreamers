using System;
namespace IqraCommerce.Models.CourseArea
{
    public class CourseModel: AppDropDownBaseModel
    {
        public string Class { get; set; }
        public int NumberOfClass { get; set; }
        public double CourseFee { get; set; }
        public string DurationInMonth { get; set; }
        public double Hour { get; set; }
        public string Version { get; set; }
        public bool IsActive { get; set; }
    }
}
