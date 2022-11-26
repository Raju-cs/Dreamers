using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.StudentModuleArea
{
    [Table("StudentModule")]
    [Alias("stdntmdl")]
    public class StudentModule: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid BatchId { get; set; }
        public Guid SubjectId  { get; set; }
        public double Charge { get; set; }
        public DateTime? DischargeDate { get; set; } = null;

       
    }
}
