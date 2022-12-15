using System;

namespace IqraCommerce.Models.StudentResultArea
{
    public class StudentResultModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid BatchId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid BatchExamId { get; set; }
        public string PhoneNumber { get; set; }
        public string GuardiansPhoneNumber { get; set; }
        public string Status { get; set; }
        public double Mark { get; set; }
    }
}
