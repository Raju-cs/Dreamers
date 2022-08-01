using IqraCommerce.Entities;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace IqraCommerce.Services
{

    public interface IDropDownService<T> : IService<T> where T : DropDownBaseEntity
    {
        ResponseJson DropDownData(Expression<Func<T, bool>> filter = null);
    }
}
