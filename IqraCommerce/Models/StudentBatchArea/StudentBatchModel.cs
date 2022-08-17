using System;

namespace IqraCommerce.Models.StudentBatchArea
{
    public class StudentBatchModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid BatchId { get; set; }
        public Guid ScheduleId { get; set; }
    }
}
