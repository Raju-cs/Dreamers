using IqraBase.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace IqraCommerce.Entities.TeacherArea
{
    [Table("Teacher")]
    [Alias("tchr")]
    public class Teacher: DropDownBaseEntity
    {
        public string PhoneNumber { get; set; }
        public string OptionalPhoneNumber { get; set; }    
        public string Email { get; set; }
        public string Gender { get; set; }
        public string UniversityName { get; set; }
        public string UniversitySubject { get; set; }
        public double   UniversityResult { get; set; }
        public bool IsActive { get; set; }  
    }
}
