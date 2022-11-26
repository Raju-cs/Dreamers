using IqraBase.Service;
using IqraCommerce.Entities.CourseRoutineArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.CourseRoutineArea
{
    public class CourseRoutineService: IqraCommerce.Services.AppBaseService<CourseRoutine>
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
                case "courseroutine":
                    name = "crshrtn.[Name]";
                    break;

                default:
                    name = "crshrtn." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, CourseRoutineQuery.Get());
            }
        }

       
    }

    public class CourseRoutineQuery
    {
        public static string Get()
        {
            return @"crshrtn.[Id]
              ,crshrtn.[CreatedAt]
              ,crshrtn.[CreatedBy]
              ,crshrtn.[UpdatedAt]
              ,crshrtn.[UpdatedBy]
              ,crshrtn.[IsDeleted]
              ,ISNULL(crshrtn.[Remarks], '') [Remarks]
              ,crshrtn.[ActivityId]
              ,ISNULL(crshrtn.[Name], '') [Name]
              ,crshrtn.[BatchId]
              ,crshrtn.[TeacherId]
              ,crshrtn.[CourseId]
              ,crshrtn.[Module]
              ,crshrtn.[Program]
              ,crshrtn.[ModuleTeacherName]
              ,crshrtn.[StartTime]
              ,crshrtn.[EndTime]
              ,crshrtn.[ClassRoomNumber]
	          ,ISNULL([btch].Name, '') [BatchName]
              ,ISNULL([tchr].Name, '') [TeacherName]
	          ,ISNULL([crsh].Name, '') [CourseName]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator] 
      FROM [dbo].[CourseRoutine] crshrtn
      LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = crshrtn.[CreatedBy]
      LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = crshrtn.[UpdatedBy]
      LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = crshrtn.[BatchId]
      LEFT JOIN [dbo].[Teacher] [tchr] ON [tchr].Id = crshrtn.[TeacherId]
      LEFT JOIN [dbo].[Course] [crsh] ON [crsh].Id = crshrtn.[CourseId]";
        }

    }
}
