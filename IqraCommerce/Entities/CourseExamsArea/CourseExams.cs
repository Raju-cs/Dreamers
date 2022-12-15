using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.CourseExamsArea
{
    [Table("CourseExams")]
    [Alias("crshxms")]
    public class CourseExams: DropDownBaseEntity
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
