﻿using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.BatchArea
{
    [Table("Batch")]
    [Alias("btch")]
    public class Batch: DropDownBaseEntity
    {

        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid ScheduleId { get; set; }
        public double TeacherPercentange { get; set; }
        public double ChargePerStudent { get; set; }
        public bool IsActive { get; set; }
    }
}
