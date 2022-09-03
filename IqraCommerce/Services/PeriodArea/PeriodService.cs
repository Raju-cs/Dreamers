using IqraBase.Service;
using IqraCommerce.Entities.PeriodArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using IqraBase.Data.Models;
using IqraCommerce.Models.PeriodArea;

namespace IqraCommerce.Services.PeriodArea
{
    public class PeriodService: IqraCommerce.Services.AppBaseService<Period>
    {
        public override string GetName(string name)
        {
            switch (name.ToLower())
            {
                case "creator":
                    name = "crtr.Name";
                    break;
                case "updator":
                    name = "pdtr.Name";
                    break;
                case "prd":
                    name = "prd.[Name]";
                    break;

                default:
                    name = "prd." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, PeriodQuery.Get());
            }
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(PeriodQuery.BasicInfo + Id + "'");
            }
        }

        public override ResponseJson OnCreate(AppBaseModel model, Guid userId, bool isValid)
        {

            var periodModel = (PeriodModel)model;

            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            periodModel.StartDate = startDate;
            periodModel.EndDate = endDate;
            return base.OnCreate(model, userId, isValid);
        }
    }

    public class PeriodQuery
    {
        public static string Get()
        {
            return @"  [prd].[Id]
              ,[prd].[CreatedAt]
              ,[prd].[CreatedBy]
              ,[prd].[UpdatedAt]
              ,[prd].[UpdatedBy]
              ,[prd].[IsDeleted]
              ,ISNULL([prd].[Remarks], '') [Remarks]
              ,[prd].[ActivityId]
              ,[prd].[Name]
              ,ISNULL([prd].[StartDate], '') [StartDate]
              ,ISNULL([prd].[EndDate], '') [EndDate]
              ,ISNULL([prd].[TotalCollected], '') [TotalCollected]
              ,ISNULL([prd].[InCome], '') [InCome]
              ,ISNULL([prd].[OutCome], '') [OutCome]
              ,[prd].[IsActive]
              ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator] 
             FROM [dbo].[Period] [prd]
             LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [prd].[CreatedBy]
             LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [prd].[UpdatedBy]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where prd.Id = '"; }
        }
    }
}
