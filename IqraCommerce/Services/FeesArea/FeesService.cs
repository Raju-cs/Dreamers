using IqraBase.Service;
using IqraCommerce.Entities.FeesArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.FeesArea
{
    public class FeesService: IqraCommerce.Services.AppBaseService<Fees>
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
                case "fs":
                    name = "fs.[Name]";
                    break;
                case "studentname":
                    name = "[stdnt].Name";
                    break;
                case "startdate":
                    name = "[prd].StartDate";
                    break;
                case "enddate":
                    name = "[prd].EndDate";
                    break;
                case "period":
                    name = "[prd].Name";
                    break;
                default:
                    name = "fs." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, FeesQuery.Get());
            }
        }
    }

    public class FeesQuery
    {
        public static string Get()
        {
               return @" [fs].[Id]
                  ,[fs].[CreatedAt]
                  ,[fs].[CreatedBy]
                  ,[fs].[UpdatedAt]
                  ,[fs].[UpdatedBy]
                  ,[fs].[IsDeleted]
                  ,ISNULL([fs].[Remarks], '') [Remarks]
                  ,[fs].[ActivityId]
                  ,ISNULL([fs].[Name], '') [Name]
                  ,ISNULL([fs].[PeriodId], '') [PeriodId]
                  ,ISNULL([fs].[StudentId], '') [StudentId]
                  ,[fs].[IsActive]
                  ,ISNULL([fs].[CourseFee], '') [CourseFee]
                  ,ISNULL([fs].[Fee], '') [Fee]
                  ,ISNULL([fs].[ModuleFee], '') [ModuleFee]
                  ,ISNULL([fs].[PaidFee], '') [PaidFee]
                  ,ISNULL([fs].[RestFee], '') [RestFee]
                  ,ISNULL([fs].[TotalFee], '') [TotalFee]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator]
	              ,ISNULL([stdnt].Name, '') [StudentName]
	              ,ISNULL([prd].Name, '') [Period]
	              ,ISNULL([prd].StartDate, '') [StartDate]
	              ,ISNULL([prd].EndDate, '') [EndDate]
              FROM [dbo].[Fees] [fs]
               LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [fs].[CreatedBy]
               LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [fs].[UpdatedBy]
               LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [fs].[StudentId]
               LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = [fs].[PeriodId]";
        }

      
    }
}
