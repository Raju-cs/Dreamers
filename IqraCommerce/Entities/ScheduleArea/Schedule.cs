using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;


namespace IqraCommerce.Entities.ScheduleArea
{
    [Table("Schedule")]
    [Alias("schdl")]
    public class Schedule: DropDownBaseEntity
    {
        public Guid ReferenceId { get; set; }
        public string Program { get; set; }
        public string Day { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string MaxStudent { get; set; }
        public string ClassRoomNumber { get; set; }
        public bool IsActive { get; set; }
    }
}
