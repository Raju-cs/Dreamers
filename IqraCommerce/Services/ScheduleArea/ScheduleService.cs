using IqraBase.Service;
using IqraCommerce.Entities.ScheduleArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.ScheduleArea
{
    public class ScheduleService: IqraCommerce.Services.AppBaseService<Schedule>
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
                case "schedule":
                    name = "schdl.[Name]";
                    break;
                
                default:
                    name = "schdl." + name;
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

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(ScheduleQuery.BasicInfo + Id + "'");
            }
        }

        public async Task<ResponseList<List<Dictionary<string, object>>>> AutoComplete(Page page)
        {
            using (DBService db = new DBService())
            {
                page.SortBy = page.SortBy ?? "[Name]";
                page.filter = page.filter ?? new List<FilterModel>();

                return await db.List(page, ScheduleQuery.AutoComplete());
            }
        }
    }

    public class ScheduleQuery
    {
        public static string Get()
        {
            return @" [schdl].[Id]
                  ,[schdl].[CreatedAt]
                  ,[schdl].[CreatedBy]
                  ,[schdl].[UpdatedAt]
                  ,[schdl].[UpdatedBy]
                  ,[schdl].[IsDeleted]
                  ,ISNULL([schdl].[Remarks], '') [Remarks]
                  ,[schdl].[ActivityId]
                  ,ISNULL([schdl].[Name], '') [Name]
                  ,ISNULL([schdl].[Day], '') [Day]
                  ,ISNULL([schdl].[MaxStudent], '') [MaxStudent]
                  ,ISNULL([schdl].[ClassRoomNumber], '') [ClassRoomNumber]
                  ,ISNULL([schdl].[Program], '') [Program]
                  ,[schdl].[IsActive]
                  ,ISNULL([schdl].[EndTime], '') [EndTime]
                  ,ISNULL([schdl].[StartTime], '') [StartTime]
                  ,[schdl].[ReferenceId]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator] 
              FROM [dbo].[Schedule] [schdl]
              LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [schdl].[CreatedBy]
              LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [schdl].[UpdatedBy]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where schdl.Id = '"; }
        }

        public static string AutoComplete()
        {
            return @"
                   SELECT [schdl].[Id]
                  ,[schdl].[CreatedAt]
                  ,[schdl].[CreatedBy]
                  ,[schdl].[UpdatedAt]
                  ,[schdl].[UpdatedBy]
                  ,[schdl].[IsDeleted]
                  ,[schdl].[Remarks]
                  ,[schdl].[ActivityId]
                  ,[schdl].[Name]
                  ,[schdl].[Day]
                  ,[schdl].[MaxStudent]
                  ,[schdl].[ClassRoomNumber]
                  ,[schdl].[Program]
                  ,[schdl].[IsActive]
                  ,[schdl].[EndTime]
                  ,[schdl].[StartTime]
                  ,[schdl].[ReferenceId]
              FROM [dbo].[Schedule] [schdl]
            ";
        }

    }
}
