using IqraCommerce.DTOs;
using IqraCommerce.Entities;
using IqraService.Search;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace IqraCommerce.Services
{
    public interface IService<T> where T : AppBaseEntity
    {
        T Insert(AppBaseDTO model, Guid userId);
        ResponseJson Update(AppBaseDTO model, Guid userId);
        Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page);
        Task<ResponseList<Pagger<Dictionary<string, object>>>> GetWithSummary(Page page);
        Task<ResponseList<Pagger<Dictionary<string, object>>>> Daily(Page page, bool isDaily);
        IQueryable<T> Get(Expression<Func<T, bool>> filter = null, Expression<Func<T, object>> orderBy = null, string includeProperties = "");
        ResponseJson CallBack(bool isValid, Action<ResponseJson> calBack);
        ResponseJson CallBack(Action<ResponseJson> calBack);
        ResponseJson OnCreate(AppBaseDTO model, Guid userId, bool isValid);
        T GetById(object id);
        Task<ResponseJson> GetDetails(object id);
        DbSet<T> GetEntity();
        void DeActivate(object id);
        void Delete(object id);
        void SaveChange();
        void Dispose();
    }
}
