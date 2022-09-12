using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.StudentArea
{
    [Table("Student")]
    [Alias("stdnt")]
    public class Student: DropDownBaseEntity
    {
        public string ImageURL { get; set; }
        public string DreamersId { get; set; }
        public string NickName { get; set; }
        public string StudentNameBangla { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth{ get; set; }
        public string Gender { get; set; }
        public string BloodGroup { get; set; }
        public string Religion { get; set; }
        public string Nationality { get; set; }
        public string StudentSchoolName { get; set; }
        public string StudentCollegeName { get; set; }
        public string Class { get; set; }
        public string Group { get; set; }
        public string Version { get; set; }
        public string Shift { get; set; }
        public string Section { get; set; }
        public string FathersName { get; set; }
        public string FathersOccupation { get; set; }
        public string FathersPhoneNumber { get; set; }
        public string FathersEmail { get; set; }
        public string MothersName { get; set; }
        public string MothersOccupation { get; set; }
        public string MothersPhoneNumber { get; set; }
        public string MothersEmail { get; set; }
        public string GuardiansName { get; set; }
        public string GuardiansOccupation { get; set; }
        public string GuardiansPhoneNumber { get; set; }
        public string GuardiansEmail { get; set; }
        public string PresentAddress { get; set; }
        public string PermanantAddress { get; set; }
        public string HomeDistrict { get; set; }
        public bool IsActive { get; set; }
    }
}
