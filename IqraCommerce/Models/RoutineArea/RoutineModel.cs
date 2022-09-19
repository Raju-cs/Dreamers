using System;
namespace IqraCommerce.Models.RoutineArea
{
    public class RoutineModel: AppDropDownBaseModel
    {
        public Guid BatchId { get; set; }
        public string Module { get; set; }
        public string Program { get; set; }
        public string Day { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string ClassRoomNumber { get; set; }
    }
}
