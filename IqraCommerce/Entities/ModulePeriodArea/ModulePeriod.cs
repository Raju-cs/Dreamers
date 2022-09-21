using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.ModulePeriodArea
{
    [Table("ModulePeriod")]
    [Alias("mdlprd")]
    public class ModulePeriod: DropDownBaseEntity
    {
        public Guid PriodId { get; set; }
        public Guid StudentModuleId { get; set; }
    }
}
