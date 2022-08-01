using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Entities
{
    public class AppBaseEntity
    {
        public AppBaseEntity()
        {

        }
        public AppBaseEntity(Guid UserId)
        {
            CreatedBy = UpdatedBy = UserId;
        }
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Guid CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public Guid UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public string Remarks { get; set; }
        /// <summary>
        /// Device Activity
        /// </summary>
        public Guid ActivityId { get; set; }
    }
}
