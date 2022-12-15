using IqraBase.Service;
using IqraCommerce.Entities.ExtendPaymentdateArea;
using IqraCommerce.Entities.FeesArea;
using IqraCommerce.Entities.ModulePeriodArea;
using IqraCommerce.Models.ExtendPaymentDateArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.ExtendPaymentDateArea
{
    public class ExtendPaymentDateService: IqraCommerce.Services.AppBaseService<ExtendPaymentDate>
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
                return await db.GetPages(page, ExtendPaymentDateQuery.Get());
            }
        }
    }
    public class ExtendPaymentDateQuery
    {
        public static string Get()
        {
            return @"[xtndpymntdt].[Id]
          ,[xtndpymntdt].[CreatedAt]
          ,[xtndpymntdt].[CreatedBy]
          ,[xtndpymntdt].[UpdatedAt]
          ,[xtndpymntdt].[UpdatedBy]
          ,[xtndpymntdt].[IsDeleted]
          ,[xtndpymntdt].[Remarks]
          ,[xtndpymntdt].[ActivityId]
          ,[xtndpymntdt].[Name]
          ,[xtndpymntdt].[PeriodId]
          ,[xtndpymntdt].[StudentId]
          ,[xtndpymntdt].[ExtendPaymentdate]
       FROM [dbo].[ExtendPaymentDate] [xtndpymntdt]";
        }
    }
}
