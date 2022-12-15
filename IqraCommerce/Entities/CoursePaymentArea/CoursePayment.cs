using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.CoursePaymentArea
{
    [Table("CoursePayment")]
    [Alias("crspymnt")]
    public class CoursePayment: DropDownBaseEntity
    {
        public Guid PeriodId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public double Paid { get; set; }
        public bool IsActive { get; set; }
    }
}
