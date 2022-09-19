﻿using System;

namespace IqraCommerce.Models.StudentModuleArea
{
    public class StudentModuleModel: AppDropDownBaseModel
    {
        public Guid StudentId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid BatchId { get; set; }
        public Guid ReferenceId { get; set; }
        public DateTime? DischargeDate { get; set; } = null;

    }
}
