using System;
using System.Collections.Generic;
using System.Text;

namespace App.Setup.LogInArea
{

    public class LogInResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid DesignationId { get; set; } = Guid.Empty;
        public string Phone { get; set; }
        public string Email { get; set; }
        public Guid SessionId { get; set; } = Guid.Empty;
        public bool IsActive { get; set; }
    }
}
