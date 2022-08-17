using IqraCommerce.Entities.StudentBatchArea;
using IqraCommerce.Models.StudentBatchArea;
using IqraCommerce.Services.StudentBatchArea;

namespace IqraCommerce.Controllers.StudentBatchArea
{
    public class StudentBatchController: AppDropDownController<StudentBatch, StudentBatchModel>
    {
        StudentBatchService ___service;

        public StudentBatchController()
        {
            service = __service = ___service = new StudentBatchService();
        }
    }
}
