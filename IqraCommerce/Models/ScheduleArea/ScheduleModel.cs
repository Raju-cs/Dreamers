﻿using System;

namespace IqraCommerce.Models.ScheduleArea
{
    public class ScheduleModel: AppDropDownBaseModel
    {

        public Guid ReferenceId { get; set; }
        public string Program { get; set; }
        public string Day { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string MaxStudent { get; set; }
        public string ClassRoomNumber { get; set; }
        public bool IsActive { get; set; }
    }
}
