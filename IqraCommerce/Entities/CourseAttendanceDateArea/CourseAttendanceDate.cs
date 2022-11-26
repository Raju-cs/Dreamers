using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.CourseAttendanceDateArea
{
    [Table("CourseAttendanceDate")]
    [Alias("crshattndncedt")]
    public class CourseAttendanceDate: DropDownBaseEntity
    {
        public Guid BatchId { get; set; }
        public Guid RoutineId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public DateTime GraceTime { get; set; }
    }
}
