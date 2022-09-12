using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.PeriodArea
{
    [Table("Period")]
    [Alias("prd")]
    public class Period: DropDownBaseEntity
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime RegularPaymentDate { get; set; }
        public double TotalCollected { get; set; }
        public double InCome { get; set; }
        public double OutCome { get; set; }
        public bool IsActive { get; set; }
    }
}
