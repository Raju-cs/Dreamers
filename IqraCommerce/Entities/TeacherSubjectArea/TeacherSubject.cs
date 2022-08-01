using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.TeacherSubjectArea
{
    [Table("TeacherSubject")]
    [Alias("tchrsbjct")]
    public class TeacherSubject: DropDownBaseEntity
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public double Charge { get; set; }

    }
}
