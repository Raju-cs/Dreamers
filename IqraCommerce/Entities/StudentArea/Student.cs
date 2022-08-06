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
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth{ get; set; }
        public string Gender { get; set; }
        public string BloodGroup { get; set; }
        public string Religion { get; set; }
        public string Nationality { get; set; }
        public bool IsActive { get; set; }



    }
}
