using IqraBase.Service;
using IqraCommerce.Entities.StudentCourseArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.StudentCourseArea
{
    public class StudentCourseService: IqraCommerce.Services.AppBaseService<StudentCourse>
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
                case "studentcourse":
                    name = "stdntcrsh.[Name]";
                    break;
                case "coursename":
                    name = "crsh.[Name]";
                    break;
                case "day":
                    name = "btch.[Name]";
                    break;
                case "starttime":
                    name = "btch.[Name]";
                    break;
                case "endtime":
                    name = "btch.[Name]";
                    break;
                case "classroomnumber":
                    name = "btch.[Name]";
                    break;
                case "maxstudent":
                    name = "btch.[Name]";
                    break;
                case "studentisdeleted":
                    name = "[stdnt].IsDeleted";
                    break;
                case "studentisactive":
                    name = "[stdnt].IsActive";
                    break;
                case "courseisactive":
                    name = "[crsh].IsActive";
                    break;
                case "courseisdeleted":
                    name = "[crsh].IsDeleted";
                    break;
                case "batchname":
                    name = "[btch].Name";
                    break;
                case "class":
                    name = "[stdnt].Class";
                    break;
                default:
                    name = "stdntcrsh." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, StudentCourseQuery.Get());
            }
        }
    }

    public class StudentCourseQuery
    {
        public static string Get()
        {
            return @" [stdntcrsh].[Id]
                  ,[stdntcrsh].[CreatedAt]
                  ,[stdntcrsh].[CreatedBy]
                  ,[stdntcrsh].[UpdatedAt]
                  ,[stdntcrsh].[UpdatedBy]
                  ,[stdntcrsh].[IsDeleted]
                  ,ISNULL([stdntcrsh].[Remarks], '') [Remarks]
                  ,[stdntcrsh].[ActivityId]
                  ,ISNULL([stdntcrsh].[Name], '') [Name]
                  ,[stdntcrsh].[StudentId]
                  ,[stdntcrsh].[CourseId]
                  ,[stdntcrsh].[BatchId]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator]
	              ,ISNULL([crsh].Name,  '')  [CourseName]
	              ,ISNULL([crsh].IsDeleted,  '')  [CourseIsDeleted]
	              ,ISNULL([crsh].IsActive,  '')  [CourseIsActive]
	              ,ISNULL([stdnt].Name,  '') [StudentName]
				  ,ISNULL([stdnt].IsDeleted,  '')  [StudentIsDeleted]
	              ,ISNULL([stdnt].IsActive,  '')  [StudentIsActive]
                  ,ISNULL([stdnt].DateOfBirth,  '')  [DateOfBirth]
	              ,ISNULL([btch].Name,  '')  [BatchName]
                  ,ISNULL([btch].Program,  '')  [Program]
	              ,ISNULL([btch].ClassRoomNumber,  '')  [ClassRoomNumber]
	              ,ISNULL([btch].MaxStudent,  '')  [MaxStudent]
                  ,ISNULL([stdnt].Class,  '')  [Class]
              FROM [dbo].[StudentCourse] [stdntcrsh]
              LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdntcrsh].[CreatedBy]
              LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdntcrsh].[UpdatedBy]
              LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [stdntcrsh].[StudentId]
              LEFT JOIN [dbo].[Course] [crsh] ON [crsh].Id = [stdntcrsh].[CourseId]
              LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [stdntcrsh].[BatchId]  And [btch].IsDeleted = 0";
        }
    }
}
