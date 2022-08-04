using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.BatchArea
{
    [Table("Batch")]
    [Alias("btch")]
    public class Batch: DropDownBaseEntity
    {
        
        public string BatchDay { get; set; }
        public string BatchTime { get; set; }
        public int AmountOfStudent { get; set; }

    }
}
