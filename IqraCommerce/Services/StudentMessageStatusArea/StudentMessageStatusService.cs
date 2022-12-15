using IqraBase.Service;
using IqraCommerce.Entities.MessageArea;
using IqraCommerce.Entities.StudentMessageStatusArea;
using IqraCommerce.Models.MessageArea;
using IqraCommerce.Models.StudentMessageStatusArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.StudentMessageStatusArea
{
    public class StudentMessageStatusService: IqraCommerce.Services.AppBaseService<StudentMessageStatus>
    {
        public override string GetName(string name)
        {
            switch (name.ToLower())
            {
                case "creator":
                    name = "ctr.Name";
                    break;
                case "updator":
                    name = "updtr.Name";
                    break;
                case "studentmessagestatus":
                    name = "stdntmsgsts.[Name]";
                    break;
                default:
                    name = "stdntmsgsts." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, StudentMessageStatusQuery.Get());
            }
        }
    }

    public class StudentMessageStatusQuery
    {
        public static string Get()
        {
            return @"stdntmsgsts.[Id]
              ,stdntmsgsts.[CreatedAt]
              ,stdntmsgsts.[CreatedBy]
              ,stdntmsgsts.[UpdatedAt]
              ,stdntmsgsts.[UpdatedBy]
              ,stdntmsgsts.[IsDeleted]
              ,stdntmsgsts.[Remarks]
              ,stdntmsgsts.[ActivityId]
              ,stdntmsgsts.[Name]
              ,stdntmsgsts.[StudentId]
              ,stdntmsgsts.[ModuleId]
              ,stdntmsgsts.[SubjectId]
              ,stdntmsgsts.[BatchId]
              ,stdntmsgsts.[MessageId]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator] 
          FROM [dbo].[StudentMessageStatus] stdntmsgsts
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = stdntmsgsts.[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = stdntmsgsts.[UpdatedBy]
          LEFT JOIN [dbo].Student stdnt ON stdnt.Id = stdntmsgsts.[StudentId]
          LEFT JOIN [dbo].Module mdl ON mdl.Id = stdntmsgsts.[ModuleId]
          LEFT JOIN [dbo].Batch btch ON btch.Id = stdntmsgsts.[BatchId]
          LEFT JOIN [dbo].Message msg ON msg.Id = stdntmsgsts.[MessageId]";
        }
    }
}
