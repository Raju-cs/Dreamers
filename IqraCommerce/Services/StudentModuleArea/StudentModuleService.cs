using IqraBase.Service;
using IqraCommerce.Entities.StudentModuleArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IqraCommerce.Services.StudentModuleArea
{
    public class StudentModuleService: IqraCommerce.Services.AppBaseService<StudentModule>
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
                case "studentmodule":
                    name = "stdntmdl.[Name]";
                    break;
                case "modulename":
                    name = "mdl.[Name]";
                    break;
                case "maxstudent":
                    name = "schdl.[Name]";
                    break;
                default:
                    name = "stdntmdl." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, StudentModuleQuery.Get());
            }
        }
    }

    public class StudentModuleQuery
    {
        public static string Get()
        {
               return @"  [stdntmdl].[Id]
              ,[stdntmdl].[CreatedAt]
              ,[stdntmdl].[CreatedBy]
              ,[stdntmdl].[UpdatedAt]
              ,[stdntmdl].[UpdatedBy]
              ,[stdntmdl].[IsDeleted]
              ,ISNULL([stdntmdl].[Remarks], '') [Remarks]
              ,[stdntmdl].[ActivityId]
              ,[stdntmdl].[Name]
              ,[stdntmdl].[StudentId]
              ,[stdntmdl].[ModuleId]
              ,[stdntmdl].[ScheduleId]
              ,[stdntmdl].[RoutineId]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
	          ,ISNULL([mdl].Name,  '')  [ModuleName]
	          ,ISNULL([stdnt].Name,  '')  [StudentName]
	          ,ISNULL([schdl].ScheduleName,  '')  [ScheduleName]
	          ,ISNULL([schdl].ClassRoomNumber,  '')  [ClassRoomNumber]
	          ,ISNULL([schdl].MaxStudent,  '')  [MaxStudent]
              ,ISNULL([rtn].Day,  '')  [Day]
	          ,ISNULL([rtn].StartTime,  '')  [StartTime]
	          ,ISNULL([rtn].EndTime,  '')  [EndTime]
          FROM [dbo].[StudentModule] [stdntmdl]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdntmdl].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdntmdl].[UpdatedBy]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [stdntmdl].[StudentId]
          LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [stdntmdl].[ModuleId]
          LEFT JOIN [dbo].[Schedule] [schdl] ON [schdl].Id = [stdntmdl].[ScheduleId] And [schdl].IsDeleted = 0 
          LEFT JOIN [dbo].[Routine] [rtn] ON [rtn].Id = [stdntmdl].[RoutineId] And [rtn].IsDeleted = 0 ";
        }
    }
}
