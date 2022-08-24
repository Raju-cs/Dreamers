using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.RoutineArea
{
    [Table("Routine")]
    [Alias("rtn")]
    public class Routine: DropDownBaseEntity
    {
        public Guid RoutineId { get; set; }
        public string Program { get; set; }
        public string Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ClassRoomNumber { get; set; }
    }
}
