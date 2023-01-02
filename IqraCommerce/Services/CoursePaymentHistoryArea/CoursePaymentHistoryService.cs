using IqraBase.Service;
using IqraCommerce.Entities.CoursePaymentHistoryArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CoursePaymentHistoryArea
{
    public class CoursePaymentHistoryService: IqraCommerce.Services.AppBaseService<CoursePaymentHistory>
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
                case "coursepaymenthistory":
                    name = "crshpymnthstry.[Name]";
                    break;
                default:
                    name = "crshpymnthstry." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CoursePaymentHistoryQuery.Get());
            }
        }

       
    }

    public class CoursePaymentHistoryQuery
    {
        public static string Get()
        {
            return @" crshpymnthstry.[Id]
      ,crshpymnthstry.[CreatedAt]
      ,crshpymnthstry.[CreatedBy]
      ,crshpymnthstry.[UpdatedAt]
      ,crshpymnthstry.[UpdatedBy]
      ,crshpymnthstry.[IsDeleted]
      ,crshpymnthstry.[Remarks]
      ,crshpymnthstry.[ActivityId]
      ,crshpymnthstry.[Name]
      ,crshpymnthstry.[StudentId]
      ,crshpymnthstry.[PeriodId]
      ,crshpymnthstry.[Charge]  
      ,crshpymnthstry.[Paid]
	  ,ISNULL([stdnt].Name, '') [StudentName]
	           ,ISNULL([prd].Name, '') [Month]
	           ,ISNULL([crtr].Name, '') [Creator]
               ,ISNULL([pdtr].Name, '') [Updator] 
     FROM [dbo].[CoursePaymentHistory] crshpymnthstry
      LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = crshpymnthstry.[CreatedBy]
      LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = crshpymnthstry.[UpdatedBy]
      LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = crshpymnthstry.[StudentId]
      LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = crshpymnthstry.[PeriodId]";
        }
     

    }
}
