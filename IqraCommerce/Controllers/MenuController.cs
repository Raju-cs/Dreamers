using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IqraBase.Data.Entities.MenuArea;
using IqraBase.Data.Models.MenuArea;
using IqraBase.Web.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace IqraCommerce.Controllers
{
    public class MenuProductController : IqraDropDownController<MenuCategory, MenuCategoryModel>
    {
        public override ActionResult Index()
        {
            if (IsLoggedId)
            {
                return View();

            }
            else
            {
                //Login View
                return View();
            }
        }
    }
}
