using IqraBase.Data.Entities;
using IqraBase.Data.Models;
using IqraBase.Service;
using IqraBase.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers
{
    public class AppController<TEntity, TModel> : IqraBaseController<TEntity, TModel>
         where TEntity : AppBaseEntity
        where TModel : AppBaseModel
    {
        public IService<TEntity> __service;
    }
}
