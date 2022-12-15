using IqraBase.Service;
using IqraCommerce.Entities.CoursePaymentArea;
using IqraCommerce.Models.CoursePaymentArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CoursePaymentArea
{
    public class CoursePaymentService: IqraCommerce.Services.AppBaseService<CoursePayment>
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
                case "coursepayment":
                    name = "crspymnt.[Name]";
                    break;
                case "crspymntisdeleted":
                    name = "crspymnt.[IsDeleted]";
                    break;
                case "id":
                    name = "[prd].[Id]";
                    break;
                default:
                    name = "crspymnt." + name;
                    break;
            }
            return base.GetName(name);
        }

        public async Task<List<CourseForFeeModel>> GetCourses(Guid studentId, Guid periodId)
        {
            using (var db = new DBService())
            {
                var res = await db.List<CourseForFeeModel>(CoursePaymentQuery.GetCourses(studentId.ToString(), periodId.ToString()));

                return res.Data;
            }
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CoursePaymentQuery.Get());
            }
        }


        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> TotalCourseFee(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] ASC" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, CoursePaymentQuery.TotalCourseFee(query));
            }
        }
    }

    public class CoursePaymentQuery
    {
        public static string Get()
        {
            return @"[crspymnt].[Id]
          ,[crspymnt].[CreatedAt]
          ,[crspymnt].[CreatedBy]
          ,[crspymnt].[UpdatedAt]
          ,[crspymnt].[UpdatedBy]
          ,[crspymnt].[IsDeleted]
          ,ISNULL([crspymnt].[Remarks], '') [Remarks]
          ,[crspymnt].[ActivityId]
          ,[crspymnt].[Name]
          ,[crspymnt].[PeriodId]
          ,[crspymnt].[StudentId]
          ,[crspymnt].[PaymentDate]
          ,[crspymnt].[Paid]
          ,[crspymnt].[IsActive]
	      ,ISNULL([prd].Name, '') [Period]
	      ,ISNULL([stdnt].Name, '') [StudentName]
          ,ISNULL([stdnt].DreamersId, '') [DreamersId]
	      ,ISNULL([crtr].Name, '') [Creator]
	      ,ISNULL([pdtr].Name, '') [Updator]
          FROM [dbo].[CoursePayment] [crspymnt]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [crspymnt].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [crspymnt].[UpdatedBy]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [crspymnt].[StudentId]
          LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = [crspymnt].[PeriodId]";
        }

        public static string TotalCourseFee(string innerCondition)
        {
            return @" * from ( 
       select  prd.[Id]
      ,prd.[CreatedAt]
      ,prd.[CreatedBy]
      ,prd.[UpdatedAt]
      ,prd.[UpdatedBy]
      ,prd.[IsDeleted]
      ,prd.[Remarks]
      ,prd.[ActivityId]
      ,prd.[Name]
	  ,SUM(Paid) as Total_Paid
 FROM [dbo].Period prd
 left join CoursePayment crspymnt on crspymnt.PeriodId = prd.Id
" + innerCondition + @" 
 group by prd.[Id]
      ,prd.[CreatedAt]
      ,prd.[CreatedBy]
      ,prd.[UpdatedAt]
      ,prd.[UpdatedBy]
      ,prd.[IsDeleted]
      ,prd.[Remarks]
      ,prd.[ActivityId]
      ,prd.[Name]) item";
        }

        public static string GetCourses(string studentId, string periodId)
        {
            return @"select  crsh.Id Id,
                crshprd.Name PeriodName, crsh.Name CourseName, stdntcrsh.CourseCharge CourseFees from [Period] prd
                left join [CoursePeriod] crshprd on crshprd.PriodId = prd.Id
                left join [StudentCourse] stdntcrsh on crshprd.StudentCourseId = stdntcrsh.Id
                left join [Course] crsh on crsh.Id = stdntcrsh.CourseId
                left join [Student] stdnt on stdnt.Id = stdntcrsh.StudentId
                where prd.Id = '" + periodId + @"' and stdnt.Id = '" + studentId + @"'";
        }
    }
}
