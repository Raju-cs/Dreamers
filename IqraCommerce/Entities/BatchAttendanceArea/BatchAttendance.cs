using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.BatchAttendanceArea
{
    [Table("BatchAttendance")]
    [Alias("btchattndnc")]
    public class BatchAttendance: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid BatchId { get; set; }
        public Guid RoutineId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid PeriodAttendanceId { get; set; }
        public DateTime? AttendanceTime { get; set; }
        public DateTime? EarlyLeaveTime { get; set; }
        public bool IsEarlyLeave { get; set; }
        public string Status { get; set; }
    }
}
