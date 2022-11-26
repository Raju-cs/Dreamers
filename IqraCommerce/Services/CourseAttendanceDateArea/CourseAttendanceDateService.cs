using IqraBase.Service;
using IqraCommerce.Entities.CourseAttendanceDateArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CourseAttendanceDateArea
{
    public class CourseAttendanceDateService: IqraCommerce.Services.AppBaseService<CourseAttendanceDate>
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
                case "courseattendancedate":
                    name = "crshattndncedt.[Name]";
                    break;
                case "scisdeleted":
                    name = "[stdntcrsh].[IsDeleted]";
                    break;
                case "scbatchid":
                    name = "[stdntcrsh].[BatchId]";
                    break;
                case "starttime":
                    name = "[rtn].StartTime";
                    break;
                default:
                    name = "crshattndncedt." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CourseAttendanceDateQuery.Get());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> CourseBatchStudent(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name]" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, CourseAttendanceDateQuery.CourseBatchStudent(query, page.Id?.ToString()));
            }
        }
    }

    public class CourseAttendanceDateQuery
    {
        public static string Get()
        {
            return @"crshattndncedt.[Id]
              ,crshattndncedt.[CreatedAt]
              ,crshattndncedt.[CreatedBy]
              ,crshattndncedt.[UpdatedAt]
              ,crshattndncedt.[UpdatedBy]
              ,crshattndncedt.[IsDeleted]
              ,ISNULL(crshattndncedt.[Remarks], '') [Remarks]
              ,crshattndncedt.[ActivityId]
              ,ISNULL(crshattndncedt.[Name], '') [Name]
	          ,ISNULL([rtn].Name, '') [Day]
	          ,ISNULL([rtn].StartTime, '') [StartTime]
              ,crshattndncedt.[BatchId]
              ,crshattndncedt.[RoutineId]
              ,crshattndncedt.[AttendanceDate]
              ,crshattndncedt.[GraceTime]
      FROM [dbo].[CourseAttendanceDate] crshattndncedt
      LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = crshattndncedt.[CreatedBy]
      LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = crshattndncedt.[UpdatedBy]
      LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = crshattndncedt.[BatchId]
      LEFT JOIN [dbo].[Routine] [rtn] ON [rtn].Id = crshattndncedt.[RoutineId]";
        }

        public static string CourseBatchStudent(string innerCondition, string courseAttendanceDateId)
        {
            return @"* from ( 
       select  stdnt.[Id],
	   crshbtchattndnce.AttendanceTime,
	   crshattndnc.GraceTime,
       crshbtchattndnce.[IsEarlyLeave]
      ,stdnt.[Name]
      ,stdnt.[DreamersId],
	    case when crshbtchattndnce.AttendanceTime >= crshattndnc.GraceTime then 'Late'
	   when crshbtchattndnce.AttendanceTime <= crshattndnc.GraceTime then 'Present'
	   else 'absent' end as Status
    from [StudentCourse] [stdntcrsh]
    left join Student stdnt on stdnt.Id = stdntcrsh.StudentId
    left join Routine rtn on rtn.BatchId = stdntcrsh.BatchId 
	left join CourseAttendanceDate crshattndnc on crshattndnc.BatchId =  stdntcrsh.BatchId and crshattndnc.Id = '" + courseAttendanceDateId + @"'
    left join  CourseBatchAttendance crshbtchattndnce on crshbtchattndnce.StudentId = stdntcrsh.StudentId and crshbtchattndnce.CourseAttendanceDateId = '" + courseAttendanceDateId + @"'
    " + innerCondition + @"
     group by stdnt.[Id]
      ,stdnt.[Name]
      ,stdnt.[DreamersId],
	   crshbtchattndnce.AttendanceTime,
	   crshattndnc.GraceTime,
       crshbtchattndnce.[IsEarlyLeave]
	) item";
        }
    }
}
