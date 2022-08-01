using IqraBase.Data.Models;
using IqraBase.Service;
using IqraCommerce.DTOs;
using IqraCommerce.Entities;
using IqraCommerce.Services.HistoryArea;
using IqraService.DB;
using IqraService.Search;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace IqraCommerce.Services
{
    public class AppBaseService<T>: IqraBase.Service.AppBaseService<T> where T : IqraBase.Data.Entities.AppBaseEntity
    {

        public AppBaseService():base(new AppDB()) { 
            
        }
        public override void Delete(object id)
        {
            var dbModel = Entity.Find(id);
            dbModel.IsDeleted = false;
            SaveChange();
        }
        public override ResponseJson Update(AppBaseModel model, Guid userId)
        {
            
            ResponseJson response = new ResponseJson();
            T dbModel = GetById(model.Id);

            model.CreatedAt = dbModel.CreatedAt;
            model.CreatedBy = dbModel.CreatedBy;
            model.UpdatedAt = DateTime.Now;
            model.UpdatedBy = userId;
            ChangeHistoryService.Set(this, model.Id, model, dbModel, model.CopyProperties(dbModel.CopyProperties((T)Activator.CreateInstance(typeof(T)))), "", "InventoryAlert=>ActionType", model.ActivityId, userId);
            model.CopyProperties(dbModel);
            SaveChange();
            return response;
        }
        
        public virtual ResponseJson Update(AppBaseModel model, string changeType, Guid userId)
        {

            ResponseJson response = new ResponseJson();
            T dbModel = GetById(model.Id);

            model.CreatedAt = dbModel.CreatedAt;
            model.CreatedBy = dbModel.CreatedBy;
            model.UpdatedAt = DateTime.Now;
            model.UpdatedBy = userId;
            ChangeHistoryService.Set(this, model.Id, model, dbModel, model.CopyProperties(dbModel.CopyProperties((T)Activator.CreateInstance(typeof(T)))), "", changeType, model.ActivityId, userId);
            model.CopyProperties(dbModel);
            SaveChange();
            return response;
        }
        
        public void Remove(DeleteDto deleteDto, Guid userId)
        {
            var dbModel = Entity.Find(deleteDto.Id);
            dbModel.IsDeleted = true;
            ChangeHistoryService.Set(this,
                                     deleteDto.Id,
                                     deleteDto,
                                     dbModel,
                                     dbModel.CopyProperties((T)Activator.CreateInstance(typeof(T))),
                                     "Deleting an Entry",
                                     "IsDeleted change to true",
                                     deleteDto.ActivityId,
                                     userId);

            SaveChange();
        }
        public async Task<ResponseJson> CallbackAsync(Action<ResponseJson> calBack)
        {
            ResponseJson response = new ResponseJson();
            try
            {
                await Task.Run(() => {

                    calBack(response);
                });

            }
            catch (Exception ex)
            {
                response.IsError = true;
                response.Msg = ex.Message;
            }
            return response;
        }
        
    }
}
