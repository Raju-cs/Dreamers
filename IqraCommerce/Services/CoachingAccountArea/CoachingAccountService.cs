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
            return @" [btch].[Id]
                  ,[btch].[CreatedAt]
                  ,[btch].[CreatedBy]
                  ,[btch].[UpdatedAt]
                  ,[btch].[UpdatedBy]
                  ,[btch].[IsDeleted]
                  ,ISNULL([btch].[Remarks], '') [Remarks]
                  ,[btch].[ActivityId]
                  ,ISNULL([btch].[Name], '') [Name]
                  ,ISNULL([btch].[MaxStudent], '') [MaxStudent]
                  ,ISNULL([btch].[ClassRoomNumber], '') [ClassRoomNumber]
                  ,ISNULL([btch].[Program], '') [Program]
                  ,[btch].[IsActive]
                  ,[btch].[ReferenceId]
                  ,ISNULL([btch].[BtachName], '') [BtachName]
                  ,ISNULL([BTCH].[Charge], '') [Charge]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator] 
              FROM [dbo].[Batch] [btch]
              LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [btch].[CreatedBy]
              LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [btch].[UpdatedBy]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where btch.Id = '"; }
        }
    }
}
