﻿using IqraBase.Service;
using IqraCommerce.Entities.SubjectArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.SubjectArea
{
    public class SubjectService: IqraCommerce.Services.AppBaseService<Subject>
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
                case "subject":
                    name = "sbjct.[Name]";
                    break;
                default:
                    name = "sbjct." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[Name] asc" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, SubjectQuery.Get());
            }
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(SubjectQuery.BasicInfo + Id + "'");
            }
        }
    }

    public class SubjectQuery
    {
        public static string Get()
        {
            return @" 
                   [sbjct].[Id]
                  ,[sbjct].[CreatedAt]
                  ,[sbjct].[CreatedBy]
                  ,[sbjct].[UpdatedAt]
                  ,[sbjct].[UpdatedBy]
                  ,[sbjct].[IsDeleted]
                  ,ISNULL([sbjct].[Remarks], '') [Remarks]
                  ,[sbjct].[ActivityId]
                  ,[sbjct].[Name]
                  ,[sbjct].[Class]
                  ,[sbjct].[Version]
                  ,[sbjct].[IsActive]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator]
              FROM [dbo].[Subject] [sbjct]
               LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [sbjct].[CreatedBy]
               LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [sbjct].[UpdatedBy]";
               
        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where sbjct.Id = '"; }
        }
    }
}
