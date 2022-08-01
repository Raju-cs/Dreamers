
using System;
namespace IqraCommerce.Models.TeacherSubjectArea
{
    public class TeacherSubjectModel: AppDropDownBaseModel
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public double Charge { get; set; }
    }
}
