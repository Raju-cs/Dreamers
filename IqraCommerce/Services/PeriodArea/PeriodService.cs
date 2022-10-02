using IqraBase.Service;
using IqraCommerce.Entities.PeriodArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

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
                case "priodid":
                    name = "[mdlprd].[PriodId]";
                    break;
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
        public async Task<ResponseList<Pagger<Dictionary<string, object>>>> ForPayment(Page page)
        {
            var innerFilters = page.filter?.Where(f => f.Type == "INNER").ToList() ?? new List<FilterModel>();
            var outerFilters = page.filter?.Where(f => f.Type != "INNER").ToList() ?? new List<FilterModel>();

            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] ASC" : page.SortBy;
            using (var db = new DBService())
            {
                page.filter = innerFilters;
                var query = GetWhereClause(page);
                page.filter = outerFilters;
                return await db.GetPages(page, PeriodQuery.ForPayment(query));
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

        public static string ForPayment(string innerCondition)
        {
            return @"* from ( 
       select  stdnt.[Id]
      ,stdnt.[Name]
      ,stdnt.[DreamersId]
      ,stdnt.[NickName]
      ,stdnt.[PhoneNumber]
      ,stdnt.[DateOfBirth]
      ,stdnt.[Gender]
      ,stdnt.[BloodGroup]
      ,stdnt.[IsActive]
      ,stdnt.[Class]
      ,stdnt.[Group]
      ,stdnt.[Version]
      ,count(btch.Id) [NumberOfModule]
      ,ISNULL(sum(btch.Charge), '') [Charge]
 from [ModulePeriod] [mdlprd]
left join StudentModule [stdntmdl] on mdlprd.StudentModuleId = stdntmdl.Id
left join Module mdl on mdl.Id = stdntmdl.ModuleId
left join Student stdnt on stdnt.Id = stdntmdl.StudentId
left join Batch btch on btch.ReferenceId = stdntmdl.ModuleId 
" + innerCondition + @"
group by stdnt.[Id]
      ,stdnt.[Name]
      ,stdnt.[DreamersId]
      ,stdnt.[NickName]
      ,stdnt.[PhoneNumber]
      ,stdnt.[DateOfBirth]
      ,stdnt.[Gender]
      ,stdnt.[BloodGroup]
      ,stdnt.[IsActive]
      ,stdnt.[Class]
      ,stdnt.[Group]
      ,stdnt.[Version]) item";
        }
    }
}
