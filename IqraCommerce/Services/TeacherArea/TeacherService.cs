﻿using IqraBase.Service;
using IqraCommerce.Entities.TeacherArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.TeacherArea
{
    public class TeacherService : IqraCommerce.Services.AppBaseService<Teacher>
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
                case "teacher":
                    name = "tchr.[Name]";
                    break;
                default:
                    name = "tchr." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = page.SortBy ?? "[Name] asc";
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, TeacherQuery.Get());
            }
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(TeacherQuery.BasicInfo + Id + "'");
            }
        }

    }
    public class TeacherQuery
    {
        public static string Get()
        {
            return @"[tchr].[Id]
      ,[tchr].[CreatedAt]
      ,[tchr].[CreatedBy]
      ,[tchr].[UpdatedAt]
      ,[tchr].[UpdatedBy]
      ,[tchr].[IsDeleted]
      ,ISNULL([tchr].[Remarks], '') [Remarks]
      ,[tchr].[ActivityId]
      ,[tchr].[Name]
      ,[tchr].[PhoneNumber]
      ,ISNULL([tchr].[Email], '') [Email]
      ,[tchr].[Gender]
      ,ISNULL([tchr].[UniversityName], '') [UniversityName]
      ,ISNULL([tchr].[UniversitySubject], '') [UniversitySubject]
      ,ISNULL([tchr].[UniversityResult], '') [UniversityResult]
      ,[tchr].[IsActive]
      ,ISNULL([tchr].[OptionalPhoneNumber], '') [OptionalPhoneNumber]
	  ,ISNULL([crtr].[Name], '') [Creator]
	  ,ISNULL([pdtr].[Name], '') [Updator]
        FROM [dbo].[Teacher] [tchr]
        LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [tchr].[CreatedBy]
        LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [tchr].[UpdatedBy]";
        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where tchr.Id = '"; }
        }

    }



}
