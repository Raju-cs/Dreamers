using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.StudentMessageStatusArea
{
    [Table("StudentMessageStatus")]
    [Alias("stdntmsgsts")]
    public class StudentMessageStatus: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid  BatchId{ get; set; }
        public Guid MessageId { get; set; }

    }
}
