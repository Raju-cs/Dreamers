using IqraBase.Service;
using IqraCommerce.Entities.StudentModuleArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

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
                    name = "btch.[Name]";
                    break;
                case "studentisdeleted":
                    name = "[stdnt].IsDeleted";
                    break;
                case "studentisactive":
                    name = "[stdnt].IsActive";
                    break;
                case "class":
                    name = "[stdnt].Class";
                    break;
                case "batchname":
                    name = "[btch].Name";
                    break;
                case "studentname":
                    name = "[stdnt].Name";
                    break;
                case "moduleisdeleted":
                    name = "[mdl].IsDeleted";
                    break;
                case "moduleisactive":
                    name = "[mdl].IsActive";
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
        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(StudentModuleQuery.BasicInfo + Id + "'");
            }
        }

        
    }

    public class StudentModuleQuery
    {
        public static string Get()
        {
               return @"[stdntmdl].[Id]
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
              ,[stdntmdl].[BatchId]
			  ,[stdntmdl].[ReferenceId]
			  ,[stdntmdl].[IsActive]
			  ,[stdntmdl].[ActiveStatusChangedAt]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator]
	          ,ISNULL([mdl].Name,  '')  [ModuleName]
	          ,ISNULL([mdl].[IsDeleted],  '')  [ModuleIsDeleted]
	          ,ISNULL([mdl].IsActive,  '')  [ModuleIsActive]
	          ,ISNULL([stdnt].Name,  '')  [StudentName]
	          ,ISNULL([stdnt].DateOfBirth,  '')  [DateOfBirth]
	          ,ISNULL([stdnt].IsDeleted,  '')  [StudentIsDeleted]
	          ,ISNULL([stdnt].IsActive,  '')  [StudentIsActive]
	          ,ISNULL([btch].Name,  '')  [BatchName]
	          ,ISNULL([btch].ClassRoomNumber,  '')  [ClassRoomNumber]
	          ,ISNULL([btch].MaxStudent,  '')  [MaxStudent]
	          ,ISNULL([btch].Charge,  '')  [Charge]
	          ,ISNULL([stdnt].Class,  '')  [Class]
          FROM [dbo].[StudentModule] [stdntmdl]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdntmdl].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdntmdl].[UpdatedBy]
          LEFT JOIN [dbo].[Student] [stdnt] ON [stdnt].Id = [stdntmdl].[StudentId]
          LEFT JOIN [dbo].[Module] [mdl] ON [mdl].Id = [stdntmdl].[ModuleId]
          LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [stdntmdl].[BatchId] And [btch].IsDeleted = 0";
        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where rtn.Id = '"; }
        }
    }
}
