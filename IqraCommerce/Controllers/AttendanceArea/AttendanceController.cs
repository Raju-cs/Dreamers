using IqraCommerce.Entities.AttendanceArea;
using IqraCommerce.Models.AttendanceArea;
using IqraCommerce.Services.AttendanceArea;

namespace IqraCommerce.Controllers.AttendanceArea
{
    public class AttendanceController : AppDropDownController<Attendance, AttendanceModel>
    {
        AttendanceService ___service;

        public AttendanceController()
        {
            service = __service = ___service = new AttendanceService();
        }
    }
}
