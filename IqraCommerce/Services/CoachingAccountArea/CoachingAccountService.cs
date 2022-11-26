using IqraBase.Service;
using IqraCommerce.Entities.CoachingAccountArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
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
                case "prdname":
                    name = "prd.[Name]";
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
                return await db.GetPages(page, CoachingAccountQuery.Get());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> ToatalAmount(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] " : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, CoachingAccountQuery.ToatalAmount(query));
            }
        }
    }

    public class CoachingAccountQuery
    {
        public static string Get()
        {
            return @" [cchngaccnt].[Id]
              ,[cchngaccnt].[CreatedAt]
              ,[cchngaccnt].[CreatedBy]
              ,[cchngaccnt].[UpdatedAt]
              ,[cchngaccnt].[UpdatedBy]
              ,[cchngaccnt].[IsDeleted]
              ,ISNULL([cchngaccnt].[Remarks], '') [Remarks]
              ,[cchngaccnt].[ActivityId]
              ,ISNULL([cchngaccnt].[Name], '') [Name]
	          ,ISNULL([prd].Name, '') [PeriodName]
	          ,ISNULL([stdnt].Name, '') [StudentName]
	          ,ISNULL([mdl].Name, '') [ModuleName]
	          ,ISNULL([crsh].Name, '') [CourseName]
              ,[cchngaccnt].[IsActive]
              ,ISNULL([cchngaccnt].[PeriodId], '') [PeriodId]
              ,ISNULL([cchngaccnt].[Amount], '') [Amount]
              ,ISNULL([cchngaccnt].[ModuleId], '') [ModuleId]
              ,ISNULL([cchngaccnt].[PaymentId], '') [PaymentId]
              ,ISNULL([cchngaccnt].[CourseId], '') [CourseId]
              ,ISNULL([cchngaccnt].[Percentage], '') [Percentage]
              ,ISNULL([cchngaccnt].[StudentId], '') [StudentId]
              ,ISNULL([cchngaccnt].[Total], '') [Total]
          FROM [dbo].[CoachingAccount] [cchngaccnt]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [cchngaccnt].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [cchngaccnt].[UpdatedBy]
          LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = [cchngaccnt].[PeriodId]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [cchngaccnt].[StudentId]
          LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [cchngaccnt].[ModuleId]
          LEFT JOIN [dbo].[Course] [crsh] ON [crsh].Id = [cchngaccnt].[CourseId]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where cchngaccnt.Id = '"; }
        }

        public static string ToatalAmount(string innerCondition)
        {
            return @" * from ( 
          select  [prd].[Name]
       ,SUM(cchngaccnt.Amount) Amount 
	  from CoachingAccount cchngaccnt

      left join Period prd on prd.Id = cchngaccnt.PeriodId
      group by cchngaccnt.PeriodId, prd.Name) item";
        }
    }
}
