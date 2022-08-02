using IqraBase.Service;
using IqraCommerce.Entities.TeacherCourseArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.TeacherCourseArea
{
    public class TeacherCourseService: IqraCommerce.Services.AppBaseService<TeacherCourse>
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
                case "teacher course":
                    name = "tchrcrs.[Name]";
                    break;
                default:
                    name = "tchrcrs." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = page.SortBy ?? "[Name] asc";
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, TeacherCourseQuery.Get());
            }
        }
    }

    public class TeacherCourseQuery
    {
        public static string Get()
        {
            return @" [tchrcrs].[Id]
      ,[tchrcrs].[CreatedAt]
      ,[tchrcrs].[CreatedBy]
      ,[tchrcrs].[UpdatedAt]
      ,[tchrcrs].[UpdatedBy]
      ,[tchrcrs].[IsDeleted]
      ,ISNULL([tchrcrs].[Remarks], '') [Remarks]
      ,[tchrcrs].[ActivityId]
      ,[tchrcrs].[Name]
      ,[tchrcrs].[TeacherId]
      ,[tchrcrs].[CourseId]
      ,[tchrcrs].[Charge]
	  ,ISNULL([crtr].Name, '') [Creator]
	  ,ISNULL([pdtr].Name, '') [Updator]
      ,[tchr].Name  [TeacherName]
	  ,[crsh].Name  [CourseName]  
      FROM [dbo].[TeacherCourse] [tchrcrs]
      LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [tchrcrs].[CreatedBy]
      LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [tchrcrs].[UpdatedBy]
      LEFT JOIN [dbo].[Teacher] [tchr] ON [tchr].Id = [tchrcrs].[TeacherId]
      LEFT JOIN [dbo].[Course] [crsh] ON [crsh].Id = [tchrcrs].[CourseId]";
        }


    }
}
