using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.CourseRoutineArea
{
    [Table("CourseRoutine")]
    [Alias("crshrtn")]
    public class CourseRoutine: DropDownBaseEntity
    {
        public Guid BatchId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }
        public string Module { get; set; }
        public string Program { get; set; }
        public string ModuleTeacherName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ClassRoomNumber { get; set; }
    }
}
