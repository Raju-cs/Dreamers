using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.StudentResultArea
{
    [Table("StudentResult")]
    [Alias("stdntrslt")]
    public class StudentResult: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid BatchId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid BatchExamId { get; set; }
        public DateTime ExamDate { get; set; }
        public string PhoneNumber { get; set; }
        public string GuardiansPhoneNumber { get; set; }
        public string Status { get; set; }
        public double Mark { get; set; }
        public double ExamBandMark { get; set; }

    }
}
