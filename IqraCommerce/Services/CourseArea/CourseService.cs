using IqraBase.Service;
using IqraCommerce.Entities.CourseArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CourseArea
{
    public class CourseService : IqraCommerce.Services.AppBaseService<Course>
    {

        public override string GetName(string name)
        {
            switch (name.ToLower())
            {
                case "creator":
                    name = "ctr.Name";
                    break;
                case "updator":
                    name = "updtr.Name";
                    break;
                case "course":
                    name = "crsh.[Name]";
                    break;
                default:
                    name = "crsh." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = page.SortBy ?? "[Name] asc";
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CourseQuery.Get());
            }
        }
    }
    public class CourseQuery
    {
        public static string Get()
        {
            return @"[crsh].[Id]
            ,[crsh].[CreatedAt]
            ,[crsh].[CreatedBy]
            ,[crsh].[UpdatedAt]
            ,[crsh].[UpdatedBy]
            ,[crsh].[IsDeleted]
            ,ISNULL([crsh].[Remarks], '') [Remarks]
            ,[crsh].[ActivityId]
            ,[crsh].[Name]
            ,[crsh].[Class]
            ,[crsh].[DurationInMonth]
            ,[crsh].[Hour]
            ,[crsh].[Version]
            ,[crsh].[IsActive]
            ,ISNULL([crtr].[Name], '') [Creator]
	        ,ISNULL([pdtr].[Name], '') [Updator]
            FROM [dbo].[Course] [crsh]
            LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [crsh].[CreatedBy]
            LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [crsh].[UpdatedBy]";

        }



    }

}
