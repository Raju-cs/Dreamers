using IqraBase.Service;
using IqraCommerce.Entities.BatchAttendanceArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.BatchAttendanceArea
{
    public class BatchAttendanceService: IqraCommerce.Services.AppBaseService<BatchAttendance>
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
                case "batchattendance":
                    name = "btchattndnc.[Name]";
                    break;
                case "studentname":
                    name = "[stdnt].Name";
                    break;
                case "batchname":
                    name = "btch.[Name]";
                    break;
                case "modulename":
                    name = "mdl.[Name]";
                    break;
                case "day":
                    name = "[rtn].Name";
                    break;
                case "date":
                    name = "prdattndnc.[AttendanceDate]";
                    break;
                default:
                    name = "btchattndnc." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, BatchAttendanceQuery.Get());
            }
        }
    }

    public class BatchAttendanceQuery
    {
        public static string Get()
        {
            return @" [btchattndnc].[Id], 
             CASE  WHEN [prdattndnc].GraceTime <= [btchattndnc].[AttendanceTime] THEN 'Late' 
			 WHEN [prdattndnc].GraceTime >= [btchattndnc].[AttendanceTime] THEN 'Present' 
			 ELSE 'Absent' END AS [AttendanceStatus]
              ,[btchattndnc].[CreatedAt]
              ,[btchattndnc].[CreatedBy]
              ,[btchattndnc].[UpdatedAt]
              ,[btchattndnc].[UpdatedBy]
              ,[btchattndnc].[IsDeleted]
              ,ISNULL([btchattndnc].[Remarks], '') [Remarks]
              ,[btchattndnc].[ActivityId]
              ,ISNULL([btchattndnc].[Name], '') [Name]
              ,[btchattndnc].[StudentId]
              ,[btchattndnc].[ModuleId]
              ,[btchattndnc].[BatchId]
			  ,[btchattndnc].[RoutineId]
			  ,[btchattndnc].[SubjectId]
              ,[btchattndnc].[PeriodAttendanceId]
			  ,ISNULL([btchattndnc].[AttendanceTime], '') [AttendanceTime]
			  ,ISNULL([btchattndnc].[EarlyLeaveTime], '') [EarlyLeaveTime]
              ,ISNULL([btchattndnc].[Status], '')  [Status]
			  ,[btchattndnc].[IsEarlyLeave]
	          ,ISNULL([stdnt].Name, '') [StudentName]
	          ,ISNULL([mdl].Name, '') [ModuleName]
	          ,ISNULL([btch].Name, '') [BatchName]
			  ,ISNULL([rtn].Name, '') [Day]
			  ,ISNULL([prdattndnc].GraceTime, '') [GraceTime]
			  ,ISNULL([prdattndnc].AttendanceDate, '') [Date]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
      FROM [dbo].[BatchAttendance] [btchattndnc]
      LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [btchattndnc].[CreatedBy]
      LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [btchattndnc].[UpdatedBy]
      LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [btchattndnc].[StudentId]
      LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [btchattndnc].[ModuleId]
      LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [btchattndnc].[BatchId]
	  LEFT JOIN [dbo].[Routine] [rtn] ON [rtn].Id = [btchattndnc].[RoutineId]
	  LEFT JOIN [dbo].[PeriodAttendance] [prdattndnc] ON [prdattndnc].Id = [btchattndnc].[PeriodAttendanceId]";

        }
    }
}
