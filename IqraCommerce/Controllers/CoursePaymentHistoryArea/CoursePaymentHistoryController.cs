using IqraCommerce.Entities.CoursePaymentHistoryArea;
using IqraCommerce.Models.CoursePaymentHistoryArea;
using IqraCommerce.Services.CoursePaymentHistoryArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.CoursePaymentHistoryArea
{
    public class CoursePaymentHistoryController: AppDropDownController<CoursePaymentHistory, CoursePaymentHistoryModel>
    {
        CoursePaymentHistoryService ___service;

        public CoursePaymentHistoryController()
        {
            service = __service = ___service = new CoursePaymentHistoryService();
        }

     
    }
}
