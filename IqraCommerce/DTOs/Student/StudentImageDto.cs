using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.DTOs.Product
{
    public class StudentImageDto
    {
        public Guid Id { get; set; }
        public IList<IFormFile> Images { get; set; }
        public Guid ActivityId { get; set; }
    }
}
