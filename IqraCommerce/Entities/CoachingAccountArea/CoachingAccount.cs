using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.CoachingAccountArea
{
    [Table("CoachingAccount")]
    [Alias("cchngaccnt")]
    public class CoachingAccount: DropDownBaseEntity
    {
        public Guid ModuleId { get; set; }
        public Guid StudentId { get; set; }
        public Guid BatchId { get; set; }
        public double ModuleIncome { get; set; }
        public double CourseIncome { get; set; }
        public double TotalIncome { get; set; }
        public bool IsActive { get; set; }

        }
}
