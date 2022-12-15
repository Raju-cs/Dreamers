using System;

namespace IqraCommerce.Models.CourseExamsArea
{
    public class CourseExamsModel: AppDropDownBaseModel
    {
        public Guid BatchId { get; set; }
        public Guid CourseId { get; set; }
        public Guid SubjectId { get; set; }
        public DateTime ExamDate { get; set; }
        public String ExamName { get; set; }
        public DateTime ExamStartTime { get; set; }
        public DateTime ExamEndTime { get; set; }
    }
}
