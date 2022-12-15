using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.LocationArea
{
    [Table("District")]
    [Alias("dstrct")]
    public class District: DropDownBaseEntity
    {
        public bool IsActive { get; set; }
    }
}
