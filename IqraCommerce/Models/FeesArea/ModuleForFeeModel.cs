using System;

namespace IqraCommerce.Models.FeesArea
{
    public class ModuleForFeeModel
    {
        public Guid Id { get; set; }
        public string PeriodName { get; set; }
        public double ModuleFees { get; set; }
        public string ModuleName { get; set; }
    }
}
