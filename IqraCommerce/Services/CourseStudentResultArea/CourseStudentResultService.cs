using IqraBase.Service;
using IqraCommerce.Entities.CourseStudentResultArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CourseStudentResultArea
{
    public class CourseStudentResultService : IqraCommerce.Services.AppBaseService<CourseStudentResult>
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
                return await db.GetPages(page, CourseStudentResultQuery.Get());
            }
        }
    }

    public class CourseStudentResultQuery
    {
        public static string Get()
        {
            return @"  crshstdntrslt.[Id]
                  ,crshstdntrslt.[CreatedAt]
                  ,crshstdntrslt.[CreatedBy]
                  ,crshstdntrslt.[UpdatedAt]
                  ,crshstdntrslt.[UpdatedBy]
                  ,crshstdntrslt.[IsDeleted]
                  ,ISNULL(crshstdntrslt.[Remarks], '') [Remarks]
                  ,crshstdntrslt.[ActivityId]
                  ,crshstdntrslt.[Name]
                  ,crshstdntrslt.[StudentId]
                  ,crshstdntrslt.[SubjectId]
                  ,crshstdntrslt.[BatchId]
                  ,crshstdntrslt.[CourseId]
                  ,crshstdntrslt.[CourseExamsId]
                  ,crshstdntrslt.[Status]
                  ,crshstdntrslt.[Mark]
				  ,ISNULL(stdnt.Name, '') [StudentName]
				  ,ISNULL(btch.Name, '') [BatchName]
				  ,ISNULL(crsh.Name, '') [CourseName]
				  ,ISNULL(sbjct.Name, '') [SubjectName]
				  ,ISNULL(crshxm.ExamName, '') [ExamName]
				  ,ISNULL(crshxm.ExamDate, '') [Date]
	              ,ISNULL([crtr].[Name], '') [Creator]
	              ,ISNULL([pdtr].[Name], '') [Updator]
          FROM [dbo].[CourseStudentResult] crshstdntrslt
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = crshstdntrslt.[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = crshstdntrslt.[UpdatedBy]
          LEFT JOIN [dbo].Student stdnt ON stdnt.Id = crshstdntrslt.[StudentId]
          LEFT JOIN [dbo].Batch btch ON btch.Id = crshstdntrslt.[BatchId]
          LEFT JOIN [dbo].Course crsh ON crsh.Id = crshstdntrslt.[CourseId]
          LEFT JOIN [dbo].Subject sbjct ON sbjct.Id = crshstdntrslt.[SubjectId]
		  LEFT JOIN [dbo].CourseExams crshxm ON crshxm.Id = crshstdntrslt.[CourseExamsId]";

        }
    
    }
}
