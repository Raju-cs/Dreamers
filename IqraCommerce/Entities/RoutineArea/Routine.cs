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
        public string Program { get; set; }
        public string Day { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string ClassRoomNumber { get; set; }
    }
}
