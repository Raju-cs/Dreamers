using IqraBase.Service;
using IqraCommerce.Entities.ModulePeriodArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.DemoArea
{
    public class ModulePeriodService: IqraCommerce.Services.AppBaseService<ModulePeriod>
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
                case "mdlprd":
                    name = "mdlprd.[Name]";
                    break;

                default:
                    name = "mdlprd." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, ModulePeriodQuery.Get());
            }
        }
    }

    public class ModulePeriodQuery
    {
        public static string Get()
        {
            return @"[mdlprd].[Id]
      ,[mdlprd].[CreatedAt]
      ,[mdlprd].[CreatedBy]
      ,[mdlprd].[UpdatedAt]
      ,[mdlprd].[UpdatedBy]
      ,[mdlprd].[IsDeleted]
      ,ISNULL([mdlprd].[Remarks], '') [Remarks]
      ,[mdlprd].[ActivityId]
      ,[mdlprd].[Name]
      ,[mdlprd].[PriodId]
      ,[mdlprd].[StudentModuleId]
	  ,ISNULL([prd].Name, '')  [PeriodName]
      ,Isnull([stdntmdl].Name, '') [StudentModuleName]
	  ,ISNULL([crtr].Name, '') [Creator]
	  ,ISNULL([pdtr].Name, '') [Updator]
  FROM [dbo].[ModulePeriod] [mdlprd]
  LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [mdlprd].[CreatedBy]
  LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [mdlprd].[UpdatedBy]
  LEFT JOIN [dbo].[Period] [prd] ON [prd].Id = [mdlprd].[PriodId]
  LEFT JOIN [dbo].[StudentModule] [stdntmdl] ON [stdntmdl].Id = [mdlprd].[StudentModuleId]";
        }
    }
}
