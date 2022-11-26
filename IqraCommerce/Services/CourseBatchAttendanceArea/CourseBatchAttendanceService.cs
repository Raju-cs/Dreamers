using IqraBase.Service;
using IqraCommerce.Entities.CourseBatchAttendanceArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CourseBatchAttendanceArea
{
    public class CourseBatchAttendanceService: IqraCommerce.Services.AppBaseService<CourseBatchAttendance>
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
                case "coursebatchattendance":
                    name = "crshbtchattndnc.[Name]";
                    break;
                default:
                    name = "crshbtchattndnc." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CourseBatchAttendanceQuery.Get());
            }
        }
    }

    public class CourseBatchAttendanceQuery
    {
        public static string Get()
        {
            return @"crshbtchattndnc.[Id],
            CASE  WHEN [crshattndncedt].GraceTime <= crshbtchattndnc.[AttendanceTime] THEN 'Late' 
			 WHEN [crshattndncedt].GraceTime >= crshbtchattndnc.[AttendanceTime] THEN 'Present' 
			 ELSE 'Absent' END AS [AttendanceStatus]
                  ,crshbtchattndnc.[CreatedAt]
                  ,crshbtchattndnc.[CreatedBy]
                  ,crshbtchattndnc.[UpdatedAt]
                  ,crshbtchattndnc.[UpdatedBy]
                  ,crshbtchattndnc.[IsDeleted]
                  ,ISNULL(crshbtchattndnc.[Remarks], '') [Remarks]
                  ,crshbtchattndnc.[ActivityId]
                  ,ISNULL(crshbtchattndnc.[Name], '') [Name]
                  ,crshbtchattndnc.[StudentId]
                  ,crshbtchattndnc.[CourseId]
                  ,crshbtchattndnc.[BatchId]
                  ,crshbtchattndnc.[RoutineId]
                  ,crshbtchattndnc.[CourseAttendanceDateId]
                  ,ISNULL([crshbtchattndnc].[AttendanceTime], '') [AttendanceTime]
			      ,ISNULL([crshbtchattndnc].[EarlyLeaveTime], '') [EarlyLeaveTime]
                  ,crshbtchattndnc.[IsEarlyLeave]
                  ,crshbtchattndnc.[Status]
	              ,ISNULL([stdnt].Name, '') [StudentName]
	              ,ISNULL([crsh].Name, '') [CourseName]
	              ,ISNULL([btch].Name, '') [BatchName]
	              ,ISNULL([rtn].Name, '') [Day]
	              ,ISNULL([crshattndncedt].GraceTime, '') [GraceTime]
	              ,ISNULL([crshattndncedt].AttendanceDate, '') [Date]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator]
      FROM [dbo].[CourseBatchAttendance] crshbtchattndnc
      LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = crshbtchattndnc.[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = crshbtchattndnc.[UpdatedBy]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = crshbtchattndnc.[StudentId]
          LEFT JOIN [dbo].[Course] [crsh] ON [crsh].Id = crshbtchattndnc.[CourseId]
          LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = crshbtchattndnc.[BatchId]
	      LEFT JOIN [dbo].[Routine] [rtn] ON [rtn].Id = crshbtchattndnc.[RoutineId]
	      LEFT JOIN [dbo].[CourseAttendanceDate] [crshattndncedt] ON [crshattndncedt].Id = crshbtchattndnc.[CourseAttendanceDateId]";
        }
    }
}
