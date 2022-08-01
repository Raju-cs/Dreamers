using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Entities
{
    public class DropDownBaseEntity : AppBaseEntity
    {
        public string Name { get; set; }
        public DropDownBaseEntity() : base()
        {

        }
        public DropDownBaseEntity(Guid UserId) : base(UserId)
        {

        }
    }
}
