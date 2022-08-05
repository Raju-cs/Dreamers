using IqraBase.Service;
using System;
using IqraCommerce.Entities.TeacherSubjectArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.TeacherSubjectArea
{
    public class TeacherSubjectService: IqraCommerce.Services.AppBaseService<TeacherSubject>
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
                case "teacher subject":
                    name = "tchrsbjct.[Name]";
                    break;
                default:
                    name = "tchrsbjct." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "" ) ? "[Name] asc" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, TeacherSubjectQuery.Get());
            }
        }

       

    }

    public class TeacherSubjectQuery
    {
        public static string Get()
        {
            return @" [tchrsbjct].[Id]
              ,[tchrsbjct].[CreatedAt]
              ,[tchrsbjct].[CreatedBy]
              ,[tchrsbjct].[UpdatedAt]
              ,[tchrsbjct].[UpdatedBy]
              ,[tchrsbjct].[IsDeleted]
              ,ISNULL([tchrsbjct].[Remarks], '') [Remarks]
              ,[tchrsbjct].[ActivityId]
              ,[tchrsbjct].[Name]
              ,[tchrsbjct].[TeacherId]
              ,[tchrsbjct].[SubjectId]
              ,[tchrsbjct].[Charge]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
			  ,[tchr].Name  [TeacherName]
			  ,[sbjct].Name [SubjectName]
          FROM [dbo].[TeacherSubject] [tchrsbjct]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [tchrsbjct].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [tchrsbjct].[UpdatedBy]
		  LEFT JOIN [dbo].[Teacher] [tchr] ON [tchr].Id = [tchrsbjct].[TeacherId]
		  LEFT JOIN [dbo].[Subject] [sbjct] ON [sbjct].Id = [tchrsbjct].[SubjectId]";
        }
        

    }
}
