using System;

namespace IqraCommerce.Models.AttendanceArea
{
    public class AttendanceModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public String Status { get; set; }
        public DateTime AttendanceDate { get; set; }
    }
}
