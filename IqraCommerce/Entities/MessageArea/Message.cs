using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.MessageArea
{
    [Table("Message")]
    [Alias("msg")]
    public class Message: DropDownBaseEntity
    {
        public string PhoneNumber { get; set; }
        public string Content { get; set; }
    }
}
