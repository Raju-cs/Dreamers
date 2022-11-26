using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.TeacherFeeArea
{
    [Table("TeacherFee")]
    [Alias("tchrfee")]
    public class TeacherFee: DropDownBaseEntity
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
