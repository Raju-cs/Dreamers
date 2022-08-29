using IqraBase.Service;
using System;
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
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CourseQuery.Get());
            }
        }
        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(CourseQuery.BasicInfo + Id + "'");
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
            ,ISNULL([crsh].[Name], '') [Name]
            ,ISNULL([crsh].[Class], '') [Class]
            ,ISNULL([crsh].[DurationInMonth], '') [DurationInMonth]
            ,ISNULL([crsh].[Hour], '') [Hour]
            ,ISNULL([crsh].[Version], '') [Version]
            ,[crsh].[IsActive]
            ,ISNULL([crsh].[NumberOfClass], '') [NumberOfClass]
            ,ISNULL([crsh].[CourseFee], '') [CourseFee]
            ,ISNULL([crsh].[CoachingPercentange], '') [CoachingPercentange]
            ,[crsh].[BatchId]
            ,ISNULL([btch].Name, '')  [Program]
	        ,ISNULL([btch].Name, '') [MaxStudent]
	        ,ISNULL([btch].Name, '') [ClassRoomNumber]
            ,ISNULL([crtr].[Name], '') [Creator]
	        ,ISNULL([pdtr].[Name], '') [Updator]
            FROM [dbo].[Course] [crsh]
            LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [crsh].[CreatedBy]
            LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [crsh].[UpdatedBy]
            LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [crsh].[BatchId]";

        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where crsh.Id = '"; }
        }
    }
}
