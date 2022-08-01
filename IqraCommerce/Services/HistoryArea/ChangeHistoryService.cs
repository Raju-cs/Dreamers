using EBonik.Data.Entities.HistoryArea;
using IqraBase.Service;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services.HistoryArea
{
    public class ChangeHistoryService : AppBaseService<ChangeHistory>
    {
        public override string GetName(string name)
        {
            switch (name.ToLower())
            {
                case "employee":
                    name = "usr.Name";
                    break;
                default:
                    name = "chnghstr." + name;
                    break;
            }
            return name;
        }
        public override string GetQuery(Page page, DBService db)
        {
            page.SortBy = page.SortBy ?? "[CreatedAt] desc";
            return ChangeHistoryQuery.Get;
        }
        public static ChangeHistory Set<T>(AppContext<T> Context, Guid id, object model, object before, object after, string remorks, string changeType, Guid ActivityId, Guid UserId) where T : class
        {
            var creator = Context.GetEntity<ChangeHistory>();
            return creator.Add(new ChangeHistory()
            {
                ActivityId = ActivityId,
                Before = Newtonsoft.Json.JsonConvert.SerializeObject(before),
                Change = Newtonsoft.Json.JsonConvert.SerializeObject(after),
                Info = Newtonsoft.Json.JsonConvert.SerializeObject(model),
                Remarks = remorks,
                ChangeFrom = model.GetType().Name,
                ChangeType = changeType,
                EntityId = id,
                CreatedBy = UserId,
                UpdatedBy = UserId
            }).Entity;
        }
    }
    public class ChangeHistoryQuery
    {
        public static string Get { get { return @"atndnc.[Id]
      ,atndnc.[EmployeeId]
	  ,usr.Name [Employee]
      ,CONVERT(varchar(5), [InterAt], 8) [InterAt]
      ,CONVERT(varchar(5), [OutAt], 8) [OutAt]
      ,atndnc.[Duration]
      ,atndnc.[Comments]
      ,atndnc.[Date]
      ,atndnc.[LateDuration]
  FROM [dbo].[ChangeHistory] atndnc
  inner join [dbo].[User] usr on atndnc.[EmployeeId]=usr.Id"; } }
    }
}
