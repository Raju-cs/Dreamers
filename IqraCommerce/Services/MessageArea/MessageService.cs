using IqraBase.Service;
using IqraCommerce.Entities.MessageArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.MessageArea
{
    public class MessageService: IqraCommerce.Services.AppBaseService<Message>
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
                case "message":
                    name = "msg.[Name]";
                    break;

                default:
                    name = "msg." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, MessageQuery.Get());
            }
        }
    }

    public class MessageQuery
    {
        public static string Get()
        {
            return @"[msg].[Id]
              ,[msg].[CreatedAt]
              ,[msg].[CreatedBy]
              ,[msg].[UpdatedAt]
              ,[msg].[UpdatedBy]
              ,[msg].[IsDeleted]
              ,ISNULL([msg].[Remarks], '') [Remarks]
              ,[msg].[ActivityId]
              ,[msg].[Name]
              ,ISNULL([msg].[PhoneNumber], '') [PhoneNumber]
              ,ISNULL([msg].[Content], '') [Content]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator] 
          FROM [dbo].[Message] [msg]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [msg].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [msg].[UpdatedBy]";
        }
    }
}
