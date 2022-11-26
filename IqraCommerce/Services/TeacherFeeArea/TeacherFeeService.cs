using IqraBase.Service;
using IqraCommerce.Entities.TeacherFeeArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.TeacherFeeArea
{
    public class TeacherFeeService: IqraCommerce.Services.AppBaseService<TeacherFee>
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
                case "teacherfee":
                    name = "tchrfee.[Name]";
                    break;
                default:
                    name = "tchrfee." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, TeacherFeeQuery.Get());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> TeacherAmount(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] " : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, TeacherFeeQuery.TeacherAmount(query));
            }
        }
    }

    public class TeacherFeeQuery
    {
        public static string Get()
        {
            return @" [tchrfee].[Id]
              ,[tchrfee].[CreatedAt]
              ,[tchrfee].[CreatedBy]
              ,[tchrfee].[UpdatedAt]
              ,[tchrfee].[UpdatedBy]
              ,[tchrfee].[IsDeleted]
              ,ISNULL([tchrfee].[Remarks], '') [Remarks]
              ,[tchrfee].[ActivityId]
              ,[tchrfee].[Name]
              ,[tchrfee].[PeriodId]
              ,[tchrfee].[TeacherId]
              ,ISNULL([tchrfee].[Fee], '') [Fee]
              ,[tchrfee].[IsActive]
              ,[tchrfee].[ModuleId]
              ,[tchrfee].[CourseId]
              ,[tchrfee].[PaymentId]
              ,ISNULL([tchrfee].[Percentage], '') [Percentage]
              ,[tchrfee].[StudentId]
              ,ISNULL([tchrfee].[Total], '') [Total]
			  ,ISNULL([mdl].Name, '') [ModuleName]
			  ,ISNULL([prd].Name, '') [PeriodName]
	          ,ISNULL([stdnt].Name, '') [StudentName]
	          ,ISNULL([tchr].Name, '') [TeacherName]
			  ,ISNULL([crsh].Name, '') [CourseName]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
          FROM [dbo].[TeacherFee] [tchrfee]
            LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [tchrfee].[CreatedBy]
            LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [tchrfee].[UpdatedBy]
	        LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = [tchrfee].[PeriodId]
	        LEFT JOIN [dbo].[Teacher] [tchr] ON [tchr].Id = [tchrfee].[TeacherId]
			LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [tchrfee].[ModuleId]
			LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [tchrfee].[StudentId]
			LEFT JOIN [dbo].[Course] [crsh] ON [crsh].Id = [tchrfee].[CourseId]";

        }

        public static string TeacherAmount(string innerCondition)
        {
            return @" * from ( 
          select 
		   tchr.Name
		  ,prd.Name as Month
          ,SUM(tchrfee.Fee) Amount 
	      from TeacherFee tchrfee
		  left join Period prd on prd.Id = tchrfee.PeriodId
		  left join Teacher tchr on tchr.Id = tchrfee.TeacherId
		  group by tchrfee.PeriodId,  prd.Name, tchr.Name) item";
        }
    }
}
