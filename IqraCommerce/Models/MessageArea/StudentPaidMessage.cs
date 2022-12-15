using System;

namespace IqraCommerce.Models.MessageArea
{
    public class StudentPaidMessage
    {
        public Guid StudentId { get; set; }
        public Guid PeriodId { get; set; }
        public string DreamersId { get; set; }
        public string StudentName { get; set; }
        public string PhoneNumber { get; set; }
        public string GuardiansPhoneNumber { get; set; }
        public double Charge { get; set; }
        public double Paid { get; set; }

    }
}
