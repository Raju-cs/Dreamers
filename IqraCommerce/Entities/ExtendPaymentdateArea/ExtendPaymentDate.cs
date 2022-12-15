using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.ExtendPaymentdateArea
{
    [Table("ExtendPaymentDate")]
    [Alias("xtndpymntdt")]
    public class ExtendPaymentDate: DropDownBaseEntity
    {
        public Guid PeriodId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime ExtendPaymentdate { get; set; }
    }
}
