using IqraBase.Service;
using IqraCommerce.Entities.PaymentHistoryArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.PaymentHistoryArea
{
    public class PaymentHistoryService : IqraCommerce.Services.AppBaseService<PaymentHistory>
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
                case "paymenthistory":
                    name = "pymnthstry.[Name]";
                    break;
                default:
                    name = "pymnthstry." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, PaymentHistoryQuery.Get());
            }
        }
        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> PaymentHistory(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] " : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, PaymentHistoryQuery.PaymentHistory());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> CoursePaymentHistory(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] " : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, PaymentHistoryQuery.CoursePaymentHistory());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> Due(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] " : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, PaymentHistoryQuery.Due());
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> Paid(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] " : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, PaymentHistoryQuery.Paid());
            }
        }

    }


    public class PaymentHistoryQuery
    {
        public static string Get()
        {
            return @" pymnthstry.[Id]
              ,pymnthstry.[CreatedAt]
              ,pymnthstry.[CreatedBy]
              ,pymnthstry.[UpdatedAt]
              ,pymnthstry.[UpdatedBy]
              ,pymnthstry.[IsDeleted]
              ,ISNULL(pymnthstry.[Remarks], '') [Remarks]
              ,pymnthstry.[ActivityId]
              ,pymnthstry.[Name]
              ,pymnthstry.[StudentId]
              ,pymnthstry.[PeriodId]
              ,pymnthstry.[Charge]
              ,pymnthstry.[Paid]
	           ,ISNULL([stdnt].Name, '') [StudentName]
	           ,ISNULL([prd].Name, '') [Month]
	           ,ISNULL([crtr].Name, '') [Creator]
               ,ISNULL([pdtr].Name, '') [Updator] 
          FROM [dbo].[PaymentHistory] pymnthstry
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = pymnthstry.[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = pymnthstry.[UpdatedBy]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = pymnthstry.[StudentId]
          LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = pymnthstry.[PeriodId]";
        }
        public static string PaymentHistory()
        {
            return @"  * from ( 
          select  stdnt.Id,
		  stdnt.Name,
		  prd.Name [Month],
		  stdnt.DreamersId,
		  p.PeriodId,
		  prd.RegularPaymentDate [RegularPaymentDate],
		  SUM(p.Charge) Charge,
          SUM(p.Paid) Paid,
		  (SUM(p.Charge) -
          SUM(p.Paid)) Due,
		  prd.CreatedAt,
		  ISNULL(xtndpymntdt.ExtendPaymentdate, '') [ExtendPaymentdate]
		 
	  from PaymentHistory p
	  Left join Student stdnt on stdnt.Id = p.StudentId
      Left join Period prd on prd.Id = p.PeriodId
	  left join ExtendPaymentDate xtndpymntdt on  xtndpymntdt.PeriodId = prd.Id and xtndpymntdt.StudentId = stdnt.Id
      group by stdnt.Id,
		  stdnt.Name, p.PeriodId,stdnt.DreamersId, prd.Name,  prd.CreatedAt, xtndpymntdt.ExtendPaymentdate, prd.RegularPaymentDate) item";
        }

        public static string Due()
        {
            return @" * from ( 
          select  stdnt.Id,
		  stdnt.Name,
		  prd.Name [Month],
		  stdnt.DreamersId,
		  p.PeriodId,
		  prd.RegularPaymentDate [RegularPaymentDate],
		  SUM(p.Charge) Charge,
          SUM(p.Paid) Paid,
		  (SUM(p.Charge) -
          SUM(p.Paid)) Due,
		  prd.CreatedAt,
		  ISNULL(xtndpymntdt.ExtendPaymentdate, '') [ExtendPaymentdate]
		 
	  from PaymentHistory p
	  Left join Student stdnt on stdnt.Id = p.StudentId
      Left join Period prd on prd.Id = p.PeriodId
	  left join ExtendPaymentDate xtndpymntdt on  xtndpymntdt.PeriodId = prd.Id and xtndpymntdt.StudentId = stdnt.Id
	  where p.Paid =  0 
      group by stdnt.Id,
		  stdnt.Name, p.PeriodId,stdnt.DreamersId, prd.Name,  prd.CreatedAt, xtndpymntdt.ExtendPaymentdate, prd.RegularPaymentDate) item";
        }

        public static string Paid()
        {
            return @"* from ( 
          select  stdnt.Id,
		  stdnt.Name,
		  prd.Name [Month],
		  stdnt.DreamersId,
		  p.PeriodId,
		  prd.RegularPaymentDate [RegularPaymentDate],
		  SUM(p.Charge) Charge,
          SUM(p.Paid) Paid,
		  (SUM(p.Charge) -
          SUM(p.Paid)) Due,
		  prd.CreatedAt,
		  ISNULL(xtndpymntdt.ExtendPaymentdate, '') [ExtendPaymentdate]
		 
	  from PaymentHistory p
	  Left join Student stdnt on stdnt.Id = p.StudentId
      Left join Period prd on prd.Id = p.PeriodId
	  left join ExtendPaymentDate xtndpymntdt on  xtndpymntdt.PeriodId = prd.Id and xtndpymntdt.StudentId = stdnt.Id
	  where p.Paid <>  0 or p.Paid = p.Charge
      group by stdnt.Id,
		  stdnt.Name, p.PeriodId,stdnt.DreamersId, prd.Name,  prd.CreatedAt, xtndpymntdt.ExtendPaymentdate, prd.RegularPaymentDate) item";
        }

        public static string CoursePaymentHistory()
        {
            return @" * from ( 
          select  stdnt.Id,
		  stdnt.Name,
		  prd.Name [Month],
		  stdnt.DreamersId,
		  c.PeriodId,
		  prd.RegularPaymentDate [RegularPaymentDate],
		  SUM(c.Charge) Charge,
          SUM(c.Paid) Paid,
		  (SUM(c.Charge) -
          SUM(c.Paid)) Due,
		  prd.CreatedAt,
		  ISNULL(xtndpymntdt.ExtendPaymentdate, '') [ExtendPaymentdate]
		 
	  from CoursePaymentHistory c
	  Left join Student stdnt on stdnt.Id = c.StudentId
      Left join Period prd on prd.Id = c.PeriodId
	  left join ExtendPaymentDate xtndpymntdt on  xtndpymntdt.PeriodId = prd.Id and xtndpymntdt.StudentId = stdnt.Id
      group by stdnt.Id,
		  stdnt.Name, c.PeriodId,stdnt.DreamersId, prd.Name,  prd.CreatedAt, xtndpymntdt.ExtendPaymentdate, prd.RegularPaymentDate) item";
        }

    }
}
