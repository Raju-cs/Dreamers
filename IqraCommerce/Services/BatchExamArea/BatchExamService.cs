using IqraBase.Service;
using IqraCommerce.Entities.BatchExamArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.BatchExamArea
{
    public class BatchExamService: IqraCommerce.Services.AppBaseService<BatchExam>
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
                case "batchexam":
                    name = "btchxm.[Name]";
                    break;
                case "smisdeleted":
                    name = "[stdntmdl].[IsDeleted]";
                    break;
                case "smbatchid":
                    name = "[stdntmdl].[BatchId]";
                    break;
                case "subjectname":
                    name = "[sbjct].Name";
                    break;
                case "modulename":
                    name = "[mdl].Name";
                    break;
                case "batchname":
                    name = "[btch].Name";
                    break;
                default:
                    name = "btchxm." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, BatchExamQuery.Get());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> ModuleBatchExamStudent(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name]" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, BatchExamQuery.ModuleBatchExamStudent(query, page.Id?.ToString()));
            }
        }
    }

    public class BatchExamQuery
    {
        public static string Get()
        {
            return @"  [btchxm].[Id]
              ,[btchxm].[CreatedAt]
              ,[btchxm].[CreatedBy]
              ,[btchxm].[UpdatedAt]
              ,[btchxm].[UpdatedBy]
              ,[btchxm].[IsDeleted]
              ,ISNULL([btchxm].[Remarks], '') [Remarks]
              ,[btchxm].[ActivityId]
              ,[btchxm].[Name]
              ,[btchxm].[BatchId]
              ,[btchxm].[ModuleId]
              ,[btchxm].[SubjectId]
              ,[btchxm].[ExamDate]
              ,[btchxm].[ExamBandMark]
              ,[btchxm].[ExamStartTime]
              ,[btchxm].[ExamEndTime]
              ,ISNULL([btchxm].[ExamName], '') [ExamName]
			  ,ISNULL([sbjct].Name, '') [SubjectName]
			  ,ISNULL([mdl].Name, '') [ModuleName]
			  ,ISNULL([btch].Name, '') [BatchName]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
          FROM [dbo].[BatchExam] [btchxm]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [btchxm].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [btchxm].[UpdatedBy]
          LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [btchxm].[BatchId]
          LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [btchxm].[ModuleId]
		  LEFT JOIN [dbo].[Subject] [sbjct] ON [sbjct].Id = [btchxm].[SubjectId]";
        }

        public static string ModuleBatchExamStudent(string innerCondition, string batchExamId)
        {
            return @"* from ( 
       select  stdnt.[Id]
      ,stdnt.[Name]
      ,stdnt.[DreamersId]
      ,stdnt.PhoneNumber
	  ,stdnt.GuardiansPhoneNumber
      ,ISNULL(stdntrslt.[Status], '') [Status]
	  ,ISNULL(stdntrslt.[Mark], '') [Mark]
    from [StudentModule] [stdntmdl]
    left join Student stdnt on stdnt.Id = stdntmdl.StudentId
    left join Routine rtn on rtn.BatchId = stdntmdl.BatchId 
    left join  StudentResult stdntrslt on stdntrslt.StudentId = stdntmdl.StudentId and stdntrslt.BatchExamId = '" + batchExamId + @"'
	" + innerCondition + @"
     group by stdnt.[Id]
      ,stdnt.[Name]
      ,stdnt.[DreamersId]
      ,stdnt.PhoneNumber
	  ,stdnt.GuardiansPhoneNumber
	  ,stdntrslt.[Status]
	  ,stdntrslt.Mark) item";
        }
    }
}
