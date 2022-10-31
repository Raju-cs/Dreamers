using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.CoursePeriodArea
{
    [Table("CoursePeriod")]
    [Alias("crshprd")]
    public class CoursePeriod: DropDownBaseEntity
    {
        public Guid PriodId { get; set; }
        public Guid StudentCourseId { get; set; }
    }
}
