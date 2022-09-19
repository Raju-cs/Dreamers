using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using IqraCommerce.Services.PeriodArea;

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
