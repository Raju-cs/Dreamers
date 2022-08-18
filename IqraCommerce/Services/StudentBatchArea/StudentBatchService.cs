using IqraBase.Service;
using IqraCommerce.Entities.StudentBatchArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.StudentBatchArea
{
    public class StudentBatchService: IqraCommerce.Services.AppBaseService<StudentBatch>
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
                case "studentbatch":
                    name = "stdntbtch.[Name]";
                    break;
                case "batchname":
                    name = "btch.[Name]";
                    break;
                case "day":
                    name = "schdl.[Name]";
                    break;
                case "starttime":
                    name = "schdl.[Name]";
                    break;
                case "endtime":
                    name = "schdl.[Name]";
                    break;
                case "classroomnumber":
                    name = "schdl.[Name]";
                    break;
                case "maxstudent":
                    name = "schdl.[Name]";
                    break;
                default:
                    name = "stdntbtch." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, StudentBatchQuery.Get());
            }
        }
    }

    public class StudentBatchQuery
    {
        public static string Get()
        {
               return @"  [stdntbtch].[Id]
              ,[stdntbtch].[CreatedAt]
              ,[stdntbtch].[CreatedBy]
              ,[stdntbtch].[UpdatedAt]
              ,[stdntbtch].[UpdatedBy]
              ,[stdntbtch].[IsDeleted]
              ,ISNULL([stdntbtch].[Remarks], '') [Remarks]
              ,[stdntbtch].[ActivityId]
              ,[stdntbtch].[Name]
              ,[stdntbtch].[StudentId]
              ,[stdntbtch].[BatchId]
              ,[stdntbtch].[ScheduleId]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
	          ,ISNULL([btch].Name,  '')  [BatchName]
	          ,ISNULL([stdnt].Name,  '')  [StudentName]
	          ,ISNULL([stdnt].Name,  '')  [ScheduleName]
	          ,ISNULL([schdl].Day,  '')  [Day]
	          ,ISNULL([schdl].StartTime,  '')  [StartTime]
	          ,ISNULL([schdl].EndTime,  '')  [EndTime]
	          ,ISNULL([schdl].ClassRoomNumber,  '')  [ClassRoomNumber]
	          ,ISNULL([schdl].MaxStudent,  '')  [MaxStudent]
          FROM [dbo].[StudentBatch] [stdntbtch]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdntbtch].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdntbtch].[UpdatedBy]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [stdntbtch].[StudentId]
          LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [stdntbtch].[BatchId]
          LEFT JOIN [dbo].[Schedule] [schdl] ON [schdl].Id = [stdntbtch].[ScheduleId] And [schdl].IsDeleted = 0 ";
        }


    }
}
