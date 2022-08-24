using IqraBase.Data.Models;
using System;

namespace IqraCommerce.Models.TeacherArea
{
    public class TeacherModel: AppDropDownBaseModel
    {
        public string PhoneNumber { get; set; }
        public string OptionalPhoneNumber { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string UniversityName { get; set; }
        public string UniversitySubject { get; set; }
        public double UniversityResult { get; set; }
        public bool IsActive { get; set; }
        
    }
}
