using System;
namespace IqraCommerce.Models.ModuleArea
{
    public class ModuleModel: AppDropDownBaseModel
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid BatchId { get; set; }
        public double TeacherPercentange { get; set; }
        public double ChargePerStudent { get; set; }
        public string Class { get; set; }
        public bool IsActive { get; set; }
    }
}
