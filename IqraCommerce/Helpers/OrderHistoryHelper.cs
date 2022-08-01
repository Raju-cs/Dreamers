using IqraCommerce.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Helpers
{
    public static class OrderHistoryHelper
    {
        static public string GenerateHistoryMessage(string prevStatus, string nextStatus)
        {
            return $"Status changed from {prevStatus} to {nextStatus}";
        }
    }
}
