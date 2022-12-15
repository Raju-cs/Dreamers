using System;

namespace IqraCommerce.Models.CourseStudentResultArea
{
    public class CourseStudentResultModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid BatchId { get; set; }
        public Guid CourseId { get; set; }
        public Guid CourseExamsId { get; set; }
        public string Status { get; set; }
        public double Mark { get; set; }
    }
}
