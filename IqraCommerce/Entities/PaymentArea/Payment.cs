using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.PaymentArea
{
    [Table("Payment")]
    [Alias("pymnt")]
    public class Payment: DropDownBaseEntity
    {

    }
}
