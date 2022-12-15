using System;
namespace IqraCommerce.Models.BatchExamArea
{
    public class BatchExamModel: AppDropDownBaseModel
    {
        public Guid BatchId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid SubjectId { get; set; }
        public DateTime ExamDate { get; set; }
        public String ExamName { get; set; }
        public double ExamBandMark { get; set; }
        public DateTime ExamStartTime { get; set; }
        public DateTime ExamEndTime { get; set; }
    }
}
