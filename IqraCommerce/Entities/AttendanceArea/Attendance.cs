using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.AttendanceArea
{
    [Table("Attendance")]
    [Alias("attndnc")]
    public class Attendance: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public String Status { get; set; }
        public DateTime AttendanceDate { get; set; }
    }
}
