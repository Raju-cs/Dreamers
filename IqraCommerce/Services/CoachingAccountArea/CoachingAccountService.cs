using IqraBase.Service;
using IqraCommerce.Entities.CoachingAccountArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CoachingAccountArea
{
    public class CoachingAccountService: IqraCommerce.Services.AppBaseService<CoachingAccount>
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
                case "coachingaccount":
                    name = "cchngaccnt.[Name]";
                    break;

                default:
                    name = "cchngaccnt." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, ScheduleQuery.Get());
            }
        }
    }

    public class ScheduleQuery
    {
        public static string Get()
        {
            return @"[cchngaccnt].[Id]
              ,[cchngaccnt].[CreatedAt]
              ,[cchngaccnt].[CreatedBy]
              ,[cchngaccnt].[UpdatedAt]
              ,[cchngaccnt].[UpdatedBy]
              ,[cchngaccnt].[IsDeleted]
              ,[cchngaccnt].[Remarks]
              ,[cchngaccnt].[ActivityId]
              ,ISNULL([cchngaccnt].[Name], '') [Name]
              ,[cchngaccnt].[IsActive]
              ,ISNULL([cchngaccnt].[CourseIncome], '') [CourseIncome]
              ,ISNULL([cchngaccnt].[ModuleIncome], '') [ModuleIncome]
              ,[cchngaccnt].[BatchId]
              ,[cchngaccnt].[StudentId]
              ,[cchngaccnt].[ModuleId]
              ,[cchngaccnt].[TotalIncome]
	          ,ISNULL([stdnt].Name, '') [StudentName] 
	          ,ISNULL([btch].Name, '') [BatchName] 
	          ,ISNULL([mdl].Name, '') [ModuleName] 
	          ,ISNULL([btch].MaxStudent, '') [MaxStudent]
              ,ISNULL([btch].Charge, '') [Charge]
          ,ISNULL([crtr].[Name], '') [Creator]
          ,ISNULL([pdtr].[Name], '') [Updator]
	        FROM [dbo].[CoachingAccount] [cchngaccnt]
	        LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [cchngaccnt].[CreatedBy]
	        LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [cchngaccnt].[UpdatedBy]
	        LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [cchngaccnt].[BatchId]
	        LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [cchngaccnt].[StudentId]
	        LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [cchngaccnt].[ModuleId]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where cchngaccnt.Id = '"; }
        }
    }
}
