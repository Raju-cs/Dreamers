using System;

namespace IqraCommerce.Models.CourseRoutineArea
{
    public class CourseRoutineModel: AppDropDownBaseModel
    {
        public Guid BatchId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }
        public string Module { get; set; }
        public string Program { get; set; }
        public string ModuleTeacherName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ClassRoomNumber { get; set; }
    }
}
