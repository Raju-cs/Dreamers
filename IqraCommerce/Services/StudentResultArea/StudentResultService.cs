using IqraBase.Service;
using IqraCommerce.Entities.StudentResultArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.StudentResultArea
{
    public class StudentResultService : IqraCommerce.Services.AppBaseService<StudentResult>
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
                case "studentresult":
                    name = "stdntrslt.[Name]";
                    break;
                case "studentname":
                    name = "stdnt.[Name]";
                    break;
                case "subjectname":
                    name = "sbjct.[Name]";
                    break;
                case "modulename":
                    name = "mdl.[Name]";
                    break;
                case "batchname":
                    name = "btch.[Name]";
                    break;
                default:
                    name = "stdntrslt." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, StudentResultQuery.Get());
            }
        }
    }

    public class StudentResultQuery
    {
        public static string Get()
        {
            return @"[stdntrslt].[Id]
              ,[stdntrslt].[CreatedAt]
              ,[stdntrslt].[CreatedBy]
              ,[stdntrslt].[UpdatedAt]
              ,[stdntrslt].[UpdatedBy]
              ,[stdntrslt].[IsDeleted]
              ,ISNULL([stdntrslt].[Remarks], '') [Remarks]
              ,[stdntrslt].[ActivityId]
              ,[stdntrslt].[Name]
              ,[stdntrslt].[StudentId]
              ,[stdntrslt].[SubjectId]
              ,[stdntrslt].[BatchId]
              ,[stdntrslt].[ModuleId]
              ,[stdntrslt].[BatchExamId]
              ,[stdntrslt].[PhoneNumber]
              ,[stdntrslt].[GuardiansPhoneNumber]
              ,[stdntrslt].[Mark]
              ,[stdntrslt].[Status]
	          ,ISNULL([stdnt].Name, '') [StudentName]
	          ,ISNULL([sbjct].Name, '') [SubjectName]
	          ,ISNULL([btch].Name, '') [BatchName]
	          ,ISNULL([mdl].Name, '') [ModuleName]
			  ,ISNULL([btchxm].ExamDate, '') [Date]
			  ,ISNULL([btchxm].ExamName, '') [ExamName]
			  ,ISNULL([btchxm].ExamBandMark, '') [ExamBandMark]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
          FROM [dbo].[StudentResult] [stdntrslt]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdntrslt].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdntrslt].[UpdatedBy]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [stdntrslt].[StudentId]
          LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [stdntrslt].[BatchId]
          LEFT JOIN [dbo].[Subject] [sbjct] ON [sbjct].Id = [stdntrslt].[SubjectId]
          LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [stdntrslt].[ModuleId]
          LEFT JOIN [dbo].[BatchExam] [btchxm] ON [btchxm].Id = [stdntrslt].[BatchExamId]";
        }
    }
}
