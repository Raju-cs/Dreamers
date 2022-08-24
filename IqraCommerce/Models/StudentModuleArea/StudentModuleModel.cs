using System;

namespace IqraCommerce.Models.StudentModuleArea
{
    public class StudentModuleModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid ScheduleId { get; set; }
        public Guid RoutineId { get; set; }

    }
}
