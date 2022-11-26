using System;

namespace IqraCommerce.Models.CourseBatchAttendanceArea
{
    public class CourseBatchAttendanceModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid CourseId { get; set; }
        public Guid BatchId { get; set; }
        public Guid RoutineId { get; set; }
        public Guid CourseAttendanceDateId { get; set; }
        public DateTime? AttendanceTime { get; set; }
        public DateTime? EarlyLeaveTime { get; set; }
        public bool IsEarlyLeave { get; set; }
        public string Status { get; set; }
    }
}
