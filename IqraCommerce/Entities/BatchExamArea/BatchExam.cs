using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.BatchExamArea
{
    [Table("BatchExam")]
    [Alias("btchxm")]
    public class BatchExam: DropDownBaseEntity
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
