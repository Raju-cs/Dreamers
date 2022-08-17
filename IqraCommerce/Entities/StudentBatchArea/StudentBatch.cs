using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.StudentBatchArea
{
    [Table("StudentBatch")]
    [Alias("stdntbtch")]
    public class StudentBatch: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid BatchId { get; set; }
        public Guid ScheduleId { get; set; }
    }
}
