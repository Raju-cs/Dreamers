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
                    name = "schdl.[Name]";
                    break;
                case "starttime":
                    name = "schdl.[Name]";
                    break;
                case "endtime":
                    name = "schdl.[Name]";
                    break;
                case "classroomnumber":
                    name = "schdl.[Name]";
                    break;
                case "maxstudent":
                    name = "schdl.[Name]";
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
            return @"[stdntcrsh].[Id]
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
                  ,[stdntcrsh].[ScheduleId]
                  ,[stdntcrsh].[RoutineId]
	              ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator]
	              ,ISNULL([crsh].Name,  '')  [CourseName]
	              ,ISNULL([stdnt].Name,  '') [StudentName]
	              ,ISNULL([schdl].ScheduleName,  '')  [ScheduleName]
                  ,ISNULL([schdl].Program,  '')  [Program]
	              ,ISNULL([schdl].ClassRoomNumber,  '')  [ClassRoomNumber]
	              ,ISNULL([schdl].MaxStudent,  '')  [MaxStudent]
              FROM [dbo].[StudentCourse] [stdntcrsh]
              LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdntcrsh].[CreatedBy]
              LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdntcrsh].[UpdatedBy]
              LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [stdntcrsh].[StudentId]
              LEFT JOIN [dbo].[Course] [crsh] ON [crsh].Id = [stdntcrsh].[CourseId]
              LEFT JOIN [dbo].[Schedule] [schdl] ON [schdl].Id = [stdntcrsh].[ScheduleId]  And [schdl].IsDeleted = 0
              LEFT JOIN [dbo].[Routine] [rtn] ON [rtn].Id = [stdntcrsh].[RoutineId] And [rtn].IsDeleted = 0";
        }
    }
}
