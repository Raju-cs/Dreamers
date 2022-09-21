using System;
namespace IqraCommerce.Models.PeriodArea
{
    public class PeriodModel: AppDropDownBaseModel
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
