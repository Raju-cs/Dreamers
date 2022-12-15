using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.MessageArea
{
    [Table("Message")]
    [Alias("msg")]
    public class Message: DropDownBaseEntity
    {
        public  Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid BatchId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid PeriodId { get; set; }
        public string PhoneNumber { get; set; }
        public string GuardiansPhoneNumber { get; set; }
        public string Content { get; set; }
    }
}
