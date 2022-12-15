using IqraBase.Service;
using IqraCommerce.Entities.CourseExamsArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CourseExamsArea
{
    public class CourseExamsService : IqraCommerce.Services.AppBaseService<CourseExams>
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
                case "courseexams":
                    name = "crshxms.[Name]";
                    break;
                case "scisdeleted":
                    name = "[stdntcrsh].[IsDeleted]";
                    break;
                case "scbatchid":
                    name = "[stdntcrsh].[BatchId]";
                    break;
                default:
                    name = "crshxms." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CourseExamsQuery.Get());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> CourseBatchExamStudent(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name]" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, CourseExamsQuery.CourseBatchExamStudent(query, page.Id?.ToString()));
            }
        }
    }

    public class CourseExamsQuery
    {
        public static string Get()
        {
            return @" crshxms.[Id]
              ,crshxms.[CreatedAt]
              ,crshxms.[CreatedBy]
              ,crshxms.[UpdatedAt]
              ,crshxms.[UpdatedBy]
              ,crshxms.[IsDeleted]
              ,ISNULL(crshxms.[Remarks], '') [Remarks]
              ,crshxms.[ActivityId]
              ,crshxms.[Name]
              ,crshxms.[SubjectId]
              ,crshxms.[CourseId]
              ,crshxms.[BatchId]
              ,crshxms.[ExamDate]
              ,crshxms.[ExamEndTime]
              ,ISNULL(crshxms.[ExamName], '') [ExamName]
			  ,ISNULL([sbjct].Name, '') [SubjectName]
              ,crshxms.[ExamStartTime]
	          ,ISNULL([crtr].[Name], '') [Creator]
	          ,ISNULL([pdtr].[Name], '') [Updator]
          FROM [dbo].[CourseExams] crshxms
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = crshxms.[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = crshxms.[UpdatedBy]
		  LEFT JOIN [dbo].[Subject] [sbjct] ON [sbjct].Id = crshxms.[SubjectId]";

        }

        public static string CourseBatchExamStudent(string innerCondition, string courseExamsId)
        {
            return @"* from ( 
       select  stdnt.[Id]
      ,stdnt.[Name] 
      ,stdnt.[DreamersId]
      ,ISNULL(crshstdntrslt.[Status], '') [Status]
	  ,ISNULL(crshstdntrslt.[Mark], '') [Mark]
    from [StudentCourse] [stdntcrsh]
    left join Student stdnt on stdnt.Id = [stdntcrsh].StudentId
    left join Routine rtn on rtn.BatchId = [stdntcrsh].BatchId 
    left join  CourseStudentResult crshstdntrslt on crshstdntrslt.StudentId = [stdntcrsh].StudentId and crshstdntrslt.CourseExamsId = '" + courseExamsId + @"'
	" + innerCondition + @"
     group by stdnt.[Id]
      ,stdnt.[Name]
      ,stdnt.[DreamersId]
	  ,crshstdntrslt.[Status]
	  ,crshstdntrslt.Mark) item";
        }
    }
}
