using IqraBase.Service;
using IqraCommerce.Entities.CoursePeriodArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CoursePeriodArea
{
    public class CoursePeriodService: IqraCommerce.Services.AppBaseService<CoursePeriod>
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
                case "crshprd":
                    name = "crshprd.[Name]";
                    break;

                default:
                    name = "crshprd." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CoursePeriodQuery.Get());
            }
        }
    }

    public class CoursePeriodQuery
    {
        public static string Get()
        {
            return @"[crshprd].[Id]
              ,[crshprd].[CreatedAt]
              ,[crshprd].[CreatedBy]
              ,[crshprd].[UpdatedAt]
              ,[crshprd].[UpdatedBy]
              ,[crshprd].[IsDeleted]
              ,[crshprd].[Remarks]
              ,[crshprd].[ActivityId]
              ,[crshprd].[Name]
              ,[crshprd].[PriodId]
              ,[crshprd].[StudentCourseId]
	          ,ISNULL([prd].Name, '')  [PeriodName]
              ,Isnull([stdntcrsh].Name, '') [StudentCourseName]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
          FROM [dbo].[CoursePeriod] [crshprd]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [crshprd].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [crshprd].[UpdatedBy]
          LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = [crshprd].[PriodId]
          LEFT JOIN [dbo].[StudentCourse] [stdntcrsh] ON [stdntcrsh].Id = [crshprd].[StudentCourseId]";
        }
    }
}
