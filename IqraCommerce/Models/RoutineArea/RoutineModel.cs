using System;
namespace IqraCommerce.Models.RoutineArea
{
    public class RoutineModel: AppDropDownBaseModel
    {
        public Guid RoutineId { get; set; }
        public string Program { get; set; }
        public string Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ClassRoomNumber { get; set; }
    }
}
