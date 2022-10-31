using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.CoachingAccountArea
{
    [Table("CoachingAccount")]
    [Alias("cchngaccnt")]
    public class CoachingAccount: DropDownBaseEntity
    {
        public Guid PeriodId { get; set; }
        public Guid StudentId { get; set; }
        public Guid PaymentId { get; set; }
        public Guid ModuleId { get; set; }
        public double Amount { get; set; }
        public double Percentage { get; set; }
        public double Total { get; set; }
        public bool IsActive { get; set; }

        }
}
