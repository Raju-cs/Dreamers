using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.ModuleArea
{
    [Table("Module")]
    [Alias("mdl")]
    public class Module: DropDownBaseEntity
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid BatchId { get; set; }
        public double TeacherPercentange { get; set; }
        public double ChargePerStudent { get; set; }
        public string Class { get; set; }
        public bool IsActive { get; set; }
    }
}
