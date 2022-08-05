using IqraBase.Service;
using System;
using IqraCommerce.Entities.BatchArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.BatchArea
{
    public class BatchService: IqraCommerce.Services.AppBaseService<Batch>
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
                case "batch":
                    name = "btch.[Name]";
                    break;
                default:
                    name = "btch." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "" ) ? "[Name] asc" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, BatchQuery.Get());
            }
        }
        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(BatchQuery.BasicInfo + Id + "'");
            }
        }
    }

    public class BatchQuery
    {
        public static string Get()
        {
            return @"  [btch].[Id]
                  ,[btch].[CreatedAt]
                  ,[btch].[CreatedBy]
                  ,[btch].[UpdatedAt]
                  ,[btch].[UpdatedBy]
                  ,[btch].[IsDeleted]
                  ,ISNULL([btch].[Remarks], '') [Remarks]
                  ,[btch].[ActivityId]
                  ,[btch].[Name]
                  ,[btch].[TeacherId]
                  ,[btch].[SubjectId]
                  ,[btch].[TeacherPercentange]
                  ,[btch].[ChargePerStudent]
                  ,[btch].[MaxStudent]
                  ,[btch].[ClassRoomNumber]
                  ,[btch].[IsActive]
                  ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator] 
	              ,ISNULL([tchr].Name, '')  [TeacherName]
	              ,ISNULL([sbjct].Name, '') [SubjectName]
              FROM [dbo].[Batch] [btch]
              LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [btch].[CreatedBy]
              LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [btch].[UpdatedBy]
              LEFT JOIN [dbo].[Teacher] [tchr] ON [tchr].Id = [btch].[TeacherId]
              LEFT JOIN [dbo].[Subject] [sbjct] ON [sbjct].Id = [btch].[SubjectId]";
        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where btch.Id = '"; }
        }


    }
}
