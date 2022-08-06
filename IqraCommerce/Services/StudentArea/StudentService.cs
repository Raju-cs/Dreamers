using IqraBase.Service;
using System;
using IqraCommerce.Entities.StudentArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.StudentArea
{
    public class StudentService: IqraCommerce.Services.AppBaseService<Student>
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
                case "student":
                    name = "stdnt.[Name]";
                    break;
                default:
                    name = "stdnt." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] asc" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, StudentQuery.Get());
            }
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(StudentQuery.BasicInfo + Id + "'");
            }
        }
    }

    public class StudentQuery
    {
        public static string Get()
        {
            return @"[stdnt].[Id]
                      ,[stdnt].[CreatedAt]
                      ,[stdnt].[CreatedBy]
                      ,[stdnt].[UpdatedAt]
                      ,[stdnt].[UpdatedBy]
                      ,[stdnt].[IsDeleted]
                      ,ISNULL([stdnt].[Remarks], '') [Remarks]
                      ,[stdnt].[ActivityId]
                      ,[stdnt].[Name]
                      ,[stdnt].[ImageURL]
                      ,[stdnt].[DreamersId]
                      ,ISNULL([stdnt].[NickName], '') [NickName]
                      ,[stdnt].[PhoneNumber]
                      ,[stdnt].[DateOfBirth]
                      ,[stdnt].[Gender]
                      ,ISNULL([stdnt].[BloodGroup], '') [BloodGroup]
                      ,ISNULL([stdnt].[Religion], '') [Religion]
                      ,ISNULL([stdnt].[Nationality], '') [Nationality]
                      ,[stdnt].[IsActive]
	                  ,ISNULL([crtr].[Name], '') [Creator]
	                  ,ISNULL([pdtr].[Name], '') [Updator]
                  FROM [dbo].[Student] [stdnt]
                  LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdnt].[CreatedBy]
                  LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdnt].[UpdatedBy]";

        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where stdnt.Id = '"; }
        }
    }

}
