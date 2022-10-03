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
            return @" [cchngaccnt].[Id]
      ,[cchngaccnt].[CreatedAt]
      ,[cchngaccnt].[CreatedBy]
      ,[cchngaccnt].[UpdatedAt]
      ,[cchngaccnt].[UpdatedBy]
      ,[cchngaccnt].[IsDeleted]
      ,[cchngaccnt].[Remarks]
      ,[cchngaccnt].[ActivityId]
      ,[cchngaccnt].[Name]
	  ,ISNULL([prd].Name, '') [PeriodName]
	  ,ISNULL([prd].[InCome], '') [InCome]
	  ,ISNULL([prd].[OutCome], '') [OutCome]
	  ,ISNULL([prd].[TotalCollected], '') [TotalCollected]
      ,[cchngaccnt].[IsActive]
      ,[cchngaccnt].[PeriodId]
  FROM [dbo].[CoachingAccount] [cchngaccnt]
  LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [cchngaccnt].[CreatedBy]
  LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [cchngaccnt].[UpdatedBy]
  LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = [cchngaccnt].[PeriodId]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where cchngaccnt.Id = '"; }
        }
    }
}
