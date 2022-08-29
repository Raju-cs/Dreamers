using IqraBase.Service;
using IqraCommerce.Entities.RoutineArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace IqraCommerce.Services.RoutineArea
{
    public class RoutineService: IqraCommerce.Services.AppBaseService<Routine>
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
                case "routine":
                    name = "rtn.[Name]";
                    break;  
                default:
                    name = "rtn." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, BatchRoutineQuery.Get());
            }
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(BatchRoutineQuery.BasicInfo + Id + "'");
            }
        }

        public async Task<ResponseList<List<Dictionary<string, object>>>> AutoComplete(Page page)
        {
            using (DBService db = new DBService())
            {
                page.SortBy = page.SortBy ?? "[Name]";
                page.filter = page.filter ?? new List<FilterModel>();

                return await db.List(page, BatchRoutineQuery.AutoComplete());
            }
        }
    }

    public class BatchRoutineQuery
    {
        public static string Get()
        {
            return @"  [rtn].[Id]
              ,[rtn].[CreatedAt]
              ,[rtn].[CreatedBy]
              ,[rtn].[UpdatedAt]
              ,[rtn].[UpdatedBy]
              ,[rtn].[IsDeleted]
              ,ISNULL([rtn].[Remarks], '') [Remarks]
              ,[rtn].[ActivityId]
              ,[rtn].[Name]
              ,[rtn].[BatchId]
              ,ISNULL([rtn].[ClassRoomNumber], '') [ClassRoomNumber]
              ,ISNULL([rtn].[Program], '') [Program]
              ,ISNULL([rtn].[Day], '') [Day]
              ,ISNULL([rtn].[StartTime], '') [StartTime]
              ,ISNULL([rtn].[EndTime], '') [EndTime]
	          ,ISNULL([crtr].Name, '') [Creator]
              ,ISNULL([pdtr].Name, '') [Updator] 
             FROM [dbo].[Routine] [rtn]
           LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [rtn].[CreatedBy]
           LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [rtn].[UpdatedBy]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where rtn.Id = '"; }
        }

        public static string AutoComplete()
        {
            return @"
                    [rtn].[Id]
              ,[rtn].[CreatedAt]
              ,[rtn].[CreatedBy]
              ,[rtn].[UpdatedAt]
              ,[rtn].[UpdatedBy]
              ,[rtn].[IsDeleted]
              ,[rtn].[Remarks]
              ,[rtn].[ActivityId]
              ,[rtn].[Name]
              ,[rtn].[RoutineId]
              ,[rtn].[ClassRoomNumber]
              ,[rtn].[Program]
              ,[rtn].[Day]
              ,[rtn].[StartTime]
              ,[rtn].[EndTime]
            FROM [dbo].[Routine] [rtn] ";
        }
    }
}
