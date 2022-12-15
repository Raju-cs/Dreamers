using IqraBase.Data.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IqraCommerce.Entities.CourseStudentResultArea
{

    [Table("CourseStudentResult")]
    [Alias("crshstdntrslt")]
    public class CourseStudentResult: DropDownBaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid BatchId { get; set; }
        public Guid CourseId { get; set; }
        public Guid CourseExamsId { get; set; }
        public string Status { get; set; }
        public double Mark { get; set; }
    }
}
