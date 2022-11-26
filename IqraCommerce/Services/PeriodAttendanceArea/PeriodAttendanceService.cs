using IqraBase.Service;
using IqraCommerce.Entities.PeriodAttendanceArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.PeriodAttendanceArea
{
    public class PeriodAttendanceService: IqraCommerce.Services.AppBaseService<PeriodAttendance>
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
                case "periodattendance":
                    name = "prdattndnc.[Name]";
                    break;
                case "smisdeleted":
                    name = "[stdntmdl].[IsDeleted]";
                    break;
                case "smbatchid":
                    name = "[stdntmdl].[BatchId]";
                    break;
                case "starttime":
                    name = "[rtn].StartTime";
                    break;
                default:
                    name = "prdattndnc." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, PeriodAttendanceQuery.Get());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> BatchStudent(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name]" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, PeriodAttendanceQuery.BatchStudent(query, page.Id?.ToString()));
            }
        }
    }

    public class PeriodAttendanceQuery
    {
        public static string Get()
        {
            return @"[prdattndnc].[Id]
      ,[prdattndnc].[CreatedAt]
      ,[prdattndnc].[CreatedBy]
      ,[prdattndnc].[UpdatedAt]
      ,[prdattndnc].[UpdatedBy]
      ,[prdattndnc].[IsDeleted]
      ,ISNULL([prdattndnc].[Remarks], '') [Remarks]
      ,[prdattndnc].[ActivityId]
      ,[prdattndnc].[Name]
      ,[prdattndnc].[AttendanceDate]
      ,[prdattndnc].[BatchId]
	  ,[prdattndnc].[RoutineId]
	  ,[prdattndnc].[GraceTime]
	  ,ISNULL([rtn].Name, '') [Day]
	  ,ISNULL([rtn].StartTime, '') [StartTime]
	  ,ISNULL([crtr].Name, '') [Creator]
	  ,ISNULL([pdtr].Name, '') [Updator]
  FROM [dbo].[PeriodAttendance] [prdattndnc]
  LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [prdattndnc].[CreatedBy]
  LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [prdattndnc].[UpdatedBy]
  LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [prdattndnc].[BatchId]
  LEFT JOIN [dbo].[Routine] [rtn] ON [rtn].Id = [prdattndnc].[RoutineId]";
        }


        public static string BatchStudent(string innerCondition, string periodAttendanceId)
        {
            return @"* from ( 
       select  stdnt.[Id],
	   btchattndnce.AttendanceTime,
	   prdattndnc.GraceTime,
       btchattndnce.[IsEarlyLeave]
      ,stdnt.[Name]
      ,stdnt.[DreamersId],
	    case when btchattndnce.AttendanceTime >= prdattndnc.GraceTime then 'Late'
	   when btchattndnce.AttendanceTime <= prdattndnc.GraceTime then 'Present'
	   else 'absent' end as Status
    from [StudentModule] [stdntmdl]
    left join Student stdnt on stdnt.Id = stdntmdl.StudentId
    left join Routine rtn on rtn.BatchId = stdntmdl.BatchId 
	left join PeriodAttendance prdattndnc on prdattndnc.BatchId =  stdntmdl.BatchId and prdattndnc.Id = '" + periodAttendanceId + @"'
    left join  BatchAttendance btchattndnce on btchattndnce.StudentId = stdntmdl.StudentId and btchattndnce.PeriodAttendanceId = '" + periodAttendanceId + @"'
    " + innerCondition + @"
     group by stdnt.[Id]
      ,stdnt.[Name]
      ,stdnt.[DreamersId],
	   btchattndnce.AttendanceTime,
	   prdattndnc.GraceTime,
       btchattndnce.[IsEarlyLeave]
	) item";
        }
    }
}
