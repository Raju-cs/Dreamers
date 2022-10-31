using System;
using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.SubjectArea
{
    [Table("Subject")]
    [Alias("sbjct")]
    public class Subject: DropDownBaseEntity
    {
        public string Class { get; set; }
        public string Version { get; set; }
        public string SearchName { get; set; }
        public bool IsActive { get; set; }
    }
}
