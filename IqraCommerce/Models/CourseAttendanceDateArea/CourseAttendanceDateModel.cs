using System;

namespace IqraCommerce.Models.CourseAttendanceDateArea
{
    public class CourseAttendanceDateModel: AppDropDownBaseModel
    {
        public Guid BatchId { get; set; }
        public Guid RoutineId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public DateTime GraceTime { get; set; }
    }
}
