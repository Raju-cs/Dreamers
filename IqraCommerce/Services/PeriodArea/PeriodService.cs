using IqraBase.Service;
using IqraCommerce.Entities.PeriodArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using IqraCommerce.Models.PeriodArea;

namespace IqraCommerce.Services.PeriodArea
{
    public class PeriodService: IqraCommerce.Services.AppBaseService<Period>
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
                case "prd":
                    name = "prd.[Name]";
                    break;
                case "startdate":
                    name = "[prd].[StartDate]";
                    break;
                case "smisdeleted":
                    name = "[stdntmdl].[IsDeleted]";
                    break;
                case "scisdeleted":
                    name = "[stdntcrsh].[IsDeleted]";
                    break;
                case "priodid":
                    name = "[mdlprd].[PriodId]";
                    break;
                case "cpriodid":
                    name = "[crshprd].[PriodId]";
                    break;
                case "charge":
                    name = "Charge";
                    break;
                case "due":
                    name = "Due";
                    break;
                /* case "fsperiodid":
                     name = "[fs].[PeriodId]";
                     break;*/
                default:
                    name = "prd." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, PeriodQuery.Get());
            }
        }

  
        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> ForModulePayment(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Charge] ASC" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page,PeriodQuery.ForModulePayment( page.Id?.ToString()));
            }
        }

        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> ForCoursePayment(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Charge] ASC" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, PeriodQuery.ForCoursePayment(query, page.Id?.ToString()));
            }
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(PeriodQuery.BasicInfo + Id + "'");
            }
        }
    }

    public class PeriodQuery
    {
        public static string Get()
        {
            return @"  [prd].[Id]
              ,[prd].[CreatedAt]
              ,[prd].[CreatedBy]
              ,[prd].[UpdatedAt]
              ,[prd].[UpdatedBy]
              ,[prd].[IsDeleted]
              ,ISNULL([prd].[Remarks], '') [Remarks]
              ,[prd].[ActivityId]
              ,[prd].[Name]
              ,ISNULL([prd].[StartDate], '') [StartDate]
              ,ISNULL([prd].[EndDate], '') [EndDate]
              ,ISNULL([prd].[TotalCollected], '') [TotalCollected]
              ,ISNULL([prd].[InCome], '') [InCome]
              ,ISNULL([prd].[OutCome], '') [OutCome]
              ,[prd].[IsActive]
              ,[prd].[RegularPaymentDate]
              ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator] 
             FROM [dbo].[Period] [prd] 
             LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [prd].[CreatedBy]
             LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [prd].[UpdatedBy]";
        }

        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where prd.Id = '"; }
        }

        public static string ForModulePayment( string periodId)
        {
            return @" * from ( 
                        select 
                            distinct stdnt.Id [StudentId], 
							stdnt.DreamersId [DreamersId],
                            stdnt.Name as [StudentName],
                            stdnt.PhoneNumber [PhoneNumber],
							stdnt.GuardiansPhoneNumber [GuardiansPhoneNumber],
							ISNULL(xtndpymntdt.ExtendPaymentdate, '') [ExtendPaymentdate],
                            sum(stdntmdl.Charge) [Charge], 
							sum(stdntmdl.Charge) -  (SELECT 
                                ISNULL( SUM(fs.Fee), 0) 
                            FROM Fees fs 
                            WHERE PeriodId = '" + periodId + @"' 
                            and fs.StudentId = stdnt.Id ) [Due],
                            (SELECT 
                                ISNULL( SUM(fs.Fee), 0) 
                            FROM Fees fs 
                            WHERE PeriodId = '" + periodId + @"' 
                            and fs.StudentId = stdnt.Id ) [Paid]
                        from ModulePeriod mdlprd
                        left join StudentModule stdntmdl on stdntmdl.Id = mdlprd.StudentModuleId
                        left join Student stdnt on stdnt.Id = stdntmdl.StudentId 
                        left join Period prd on prd.Id = mdlprd.PriodId
                        left join ExtendPaymentDate xtndpymntdt on  xtndpymntdt.PeriodId = mdlprd.PriodId and xtndpymntdt.StudentId = stdnt.Id
                         where mdlprd.PriodId = '" + periodId + @"'   and stdntmdl.IsDeleted = 0
                        group by stdnt.Id, 
                                 stdnt.Name,
                                 stdnt.PhoneNumber,
								 stdnt.GuardiansPhoneNumber,
								 stdnt.DreamersId,
								 xtndpymntdt.ExtendPaymentdate)item";
        }

        public static string ForCoursePayment(string innerCondition, string periodId)
        {
            return @" * from (   select 
                           distinct stdnt.Id [StudentId], 
							stdnt.DreamersId [DreamersId],
                            stdnt.Name as [StudentName], 
							ISNULL(xtndpymntdt.ExtendPaymentdate, '') [ExtendPaymentdate],
                            sum(stdntcrsh.CourseCharge) [Charge], 
							sum(stdntcrsh.CourseCharge) -  (SELECT 
                                ISNULL( SUM(crspymnt.Paid), 0) 
                            FROM CoursePayment crspymnt 
                            WHERE PeriodId = '" + periodId + @"' 
                            and crspymnt.StudentId = stdnt.Id ) [Due],
                            (SELECT 
                                ISNULL( SUM(crspymnt.Paid), 0) 
                            FROM CoursePayment crspymnt 
                            WHERE PeriodId = '" + periodId + @"' 
                            and crspymnt.StudentId = stdnt.Id ) [Paid]
                        from CoursePeriod crshprd
                        left join StudentCourse stdntcrsh on stdntcrsh.Id = crshprd.StudentCourseId
                        left join Student stdnt on stdnt.Id = stdntcrsh.StudentId
                        left join Period prd on prd.Id = crshprd.PriodId
						left join ExtendPaymentDate xtndpymntdt on  xtndpymntdt.PeriodId = crshprd.PriodId and xtndpymntdt.StudentId = stdnt.Id
                        where crshprd.PriodId = '" + periodId + @"'  and stdntcrsh.IsDeleted = 0
                        group by  stdnt.Id, 
                                 stdnt.Name,
								 stdnt.DreamersId,
								 xtndpymntdt.ExtendPaymentdate)item";
        }

    }
}
