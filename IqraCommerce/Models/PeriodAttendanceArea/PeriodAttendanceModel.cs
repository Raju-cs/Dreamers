using System;
namespace IqraCommerce.Models.PeriodAttendanceArea
{
    public class PeriodAttendanceModel: AppDropDownBaseModel
    {
        public Guid BatchId { get; set; }
        public Guid RoutineId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public DateTime GraceTime { get; set; }
    }
}
