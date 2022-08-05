using System;
namespace IqraCommerce.Models.BatchArea
{
    public class BatchModel: AppDropDownBaseModel
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public double TeacherPercentange { get; set; }
        public double ChargePerStudent { get; set; }
        public string MaxStudent { get; set; }
        public string ClassRoomNumber { get; set; }
        public bool IsActive { get; set; }
    }
}
