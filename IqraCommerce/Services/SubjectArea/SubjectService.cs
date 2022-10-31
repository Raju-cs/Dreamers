using IqraBase.Service;
using IqraCommerce.Entities.SubjectArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.SubjectArea
{
    public class SubjectService: IqraCommerce.Services.AppBaseService<Subject>
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
                case "subject":
                    name = "sbjct.[Name]";
                    break;
                default:
                    name = "sbjct." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;

            using (var db = new DBService(this))
            {
                return await db.GetPages(page, SubjectQuery.Get());
            }
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(SubjectQuery.BasicInfo + Id + "'");
            }
        }

        public async Task<ResponseList<List<Dictionary<string, object>>>> AutoComplete(Page page)
        {
            page.SortBy = page.SortBy ?? "[Name]";
            page.filter = page.filter ?? new List<FilterModel>();

            using (DBService db = new DBService())
            {
                return await db.List(page, SubjectQuery.AutoComplete());
            }
        }


    }

    public class SubjectQuery
    {
        public static string Get()
        {
            return @" 
                   [sbjct].[Id]
                  ,[sbjct].[CreatedAt]
                  ,[sbjct].[CreatedBy]
                  ,[sbjct].[UpdatedAt]
                  ,[sbjct].[UpdatedBy]
                  ,[sbjct].[IsDeleted]
                  ,ISNULL([sbjct].[Remarks], '') [Remarks]
                  ,[sbjct].[ActivityId]
                  ,[sbjct].[Name]
                  ,[sbjct].[Class]
                  ,[sbjct].[Version]
                  ,[sbjct].[IsActive]
                  ,ISNULL([sbjct].[SearchName], '') [SearchName]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator]
              FROM [dbo].[Subject] [sbjct]
               LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [sbjct].[CreatedBy]
               LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [sbjct].[UpdatedBy]";
               
        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where sbjct.Id = '"; }
        }

        public static string AutoComplete()
        {
            return @"
                    SELECT
                    [sbjct].[Id]
                  ,[sbjct].[CreatedAt]
                  ,[sbjct].[CreatedBy]
                  ,[sbjct].[UpdatedAt]
                  ,[sbjct].[UpdatedBy]
                  ,[sbjct].[IsDeleted]
                  ,ISNULL([sbjct].[Remarks], '') [Remarks]
                  ,[sbjct].[ActivityId]
                  ,[sbjct].[Name]
                  ,[sbjct].[Class]
                  ,[sbjct].[Version]
                  ,[sbjct].[IsActive]
                  ,[sbjct].[SearchName]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator]
              FROM [dbo].[Subject] [sbjct]
               LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [sbjct].[CreatedBy]
               LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [sbjct].[UpdatedBy] ";
        }
    }
}
