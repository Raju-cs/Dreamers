using IqraCommerce.Entities.MessageArea;
using IqraCommerce.Entities.StudentMessageStatusArea;
using IqraCommerce.Models.MessageArea;
using IqraCommerce.Models.StudentMessageStatusArea;
using IqraCommerce.Services.StudentMessageStatusArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.StudentMessageStatusArea
{
    public class StudentMessageStatusController: AppDropDownController<StudentMessageStatus, StudentMessageStatusModel>
    {
        StudentMessageStatusService ___service;

        public StudentMessageStatusController()
        {
            service = __service = ___service = new StudentMessageStatusService();
        }
    }
}
