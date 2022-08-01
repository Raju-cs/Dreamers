using IqraCommerce.Entities.TeacherSubjectArea;
using IqraCommerce.Models.TeacherSubjectArea;
using IqraCommerce.Services.TeacherSubjectArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.TeacherSubjectArea
{
    public class TeacherSubjectController: AppDropDownController<TeacherSubject, TeacherSubjectModel>
    {
        TeacherSubjectService ___service;

        public TeacherSubjectController()
        {
            service = __service = ___service = new TeacherSubjectService();
        }

      

    }
}
