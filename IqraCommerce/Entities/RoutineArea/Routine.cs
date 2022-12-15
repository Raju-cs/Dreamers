using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.RoutineArea
{
    [Table("Routine")]
    [Alias("rtn")]
    public class Routine: DropDownBaseEntity
    {
        public Guid BatchId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid CourseId { get; set; }
        public Guid SubjectId { get; set; }
        public string Module { get; set; }
        public string Program { get; set; }
        public string ModuleTeacherName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ClassRoomNumber { get; set; }
    }
}
