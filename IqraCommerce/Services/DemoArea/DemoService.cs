using IqraBase.Service;
using IqraCommerce.Entities.DemoArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.DemoArea
{
    public class DemoService : IqraCommerce.Services.AppBaseService<Demo>
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
                return await db.GetPages(page, DemoQuery.Get());
            }
        }
    }
    public class DemoQuery
    {
        public static string Get()
        {
            return @" ";
        }
    }
}
