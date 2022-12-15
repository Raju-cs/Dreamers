using System;

namespace IqraCommerce.Models.StudentMessageStatusArea
{
    public class StudentMessageStatusModel:AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid BatchId { get; set; }
        public Guid MessageId { get; set; }
    }
}
