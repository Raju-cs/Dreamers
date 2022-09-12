using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.DemoArea
{
    [Table("Demo")]
    [Alias("dm")]
    public class Demo: DropDownBaseEntity
    {
    }
}
