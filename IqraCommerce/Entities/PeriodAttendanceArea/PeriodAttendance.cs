using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.PeriodAttendanceArea
{
    [Table("PeriodAttendance")]
    [Alias("prdattndnc")]
    public class PeriodAttendance: DropDownBaseEntity
    {
        public Guid BatchId { get; set; }
        public Guid RoutineId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public DateTime GraceTime { get; set; }
    }
}
