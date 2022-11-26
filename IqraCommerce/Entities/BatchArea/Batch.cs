using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;


namespace IqraCommerce.Entities.BatchArea
{
    [Table("Batch")]
    [Alias("btch")]
    public class Batch: DropDownBaseEntity
    {
        public Guid ReferenceId { get; set; }
        public Guid CourseId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public string BtachName { get; set; }
        public string Program { get; set; }
        public string MaxStudent { get; set; }
        public string ClassRoomNumber { get; set; }
        public double Charge { get; set; }
        public bool IsActive { get; set; }
    }
}
