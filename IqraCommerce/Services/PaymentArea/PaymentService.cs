using IqraBase.Service;
using IqraCommerce.Entities.PaymentArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.PaymentArea
{
    public class PaymentService: IqraCommerce.Services.AppBaseService<Payment>
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
                case "pymnt":
                    name = "pymnt.[Name]";
                    break;

                default:
                    name = "pymnt." + name;
                    break;
            }
            return base.GetName(name);
        }

        internal Task<object> BasicInfo(Guid id)
        {
            throw new NotImplementedException();
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, PaymentQuery.Get());
            }
        }
    }

    public class PaymentQuery
    {
        public static string Get()
        {
            return @" [btch].[Id]
                  ,[btch].[CreatedAt]
                  ,[btch].[CreatedBy]
                  ,[btch].[UpdatedAt]
                  ,[btch].[UpdatedBy]
                  ,[btch].[IsDeleted]
                  ,ISNULL([btch].[Remarks], '') [Remarks]
                  ,[btch].[ActivityId]
                  ,ISNULL([btch].[Name], '') [Name]
                  ,ISNULL([btch].[MaxStudent], '') [MaxStudent]
                  ,ISNULL([btch].[ClassRoomNumber], '') [ClassRoomNumber]
                  ,ISNULL([btch].[Program], '') [Program]
                  ,[btch].[IsActive]
                  ,[btch].[ReferenceId]
                  ,ISNULL([btch].[BtachName], '') [BtachName]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator] 
              FROM [dbo].[Batch] [btch]
              LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [btch].[CreatedBy]
              LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [btch].[UpdatedBy]";
        }
    }
}
