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
        public bool IsActive { get; set; }

        }
}
