using System;

namespace IqraCommerce.Models.BatchArea
{
    public class BatchModel: AppDropDownBaseModel
    {
        public Guid ReferenceId { get; set; }
        public Guid CourseId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public string Program { get; set; }
        public string BtachName { get; set; }
        public string MaxStudent { get; set; }
        public string ClassRoomNumber { get; set; }
        public double Charge { get; set; }
        public bool IsActive { get; set; }
    }
}
