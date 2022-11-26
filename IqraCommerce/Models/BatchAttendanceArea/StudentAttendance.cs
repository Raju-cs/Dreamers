using System;

namespace IqraCommerce.Models.BatchAttendanceArea
{
    public class StudentAttendance
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid BatchId { get; set; }
        public DateTime? EndTime { get; set; }

    }
}
