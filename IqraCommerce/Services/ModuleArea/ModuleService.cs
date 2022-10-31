using IqraBase.Service;
using System;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;
using IqraCommerce.Entities.ModuleArea;

namespace IqraCommerce.Services.ModuleArea
{
    public class ModuleService: IqraCommerce.Services.AppBaseService<Module>
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
                case "module":
                    name = "mdl.[Name]";
                    break;
                case "teachername":
                    name = "[tchr].Name";
                    break;
                case "subjectname":
                    name = "[sbjct].Name";
                    break;
             
                default:
                    name = "mdl." + name;
                    break;
            }
            return base.GetName(name);
        }
        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "" ) ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, ModuleQuery.Get());
            }
        }
        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(ModuleQuery.BasicInfo + Id + "'");
            }
        }
    }

    public class ModuleQuery
    {
        public static string Get()
        {
            return @"[mdl].[Id]
                  ,[mdl].[CreatedAt]
                  ,[mdl].[CreatedBy]
                  ,[mdl].[UpdatedAt]
                  ,[mdl].[UpdatedBy]
                  ,[mdl].[IsDeleted]
                  ,ISNULL([mdl].[Remarks], '') [Remarks]
                  ,[mdl].[ActivityId]
                  ,[mdl].[Name]
                  ,ISNULL([mdl].[TeacherId], '') [TeacherId]
                  ,ISNULL([mdl].[SubjectId], '') [SubjectId]
                  ,ISNULL([mdl].[TeacherPercentange], '') [TeacherPercentange]
                  ,ISNULL([mdl].[ChargePerStudent], '')   [ChargePerStudent]
                  ,[mdl].[IsActive]
                  ,ISNULL([mdl].[BatchId], '') [BatchId]
                  ,ISNULL([mdl].[Class], '') [Class]
				  ,ISNULL([btch].Name, '')  [Program]
				  ,ISNULL([btch].Name, '') [MaxStudent]
				  ,ISNULL([btch].Name, '') [ClassRoomNumber]
                  ,ISNULL([crtr].Name, '') [Creator]
	              ,ISNULL([pdtr].Name, '') [Updator] 
	              ,ISNULL([tchr].Name, '')  [TeacherName]
	              ,ISNULL([sbjct].SearchName, '') [SubjectName]
              FROM [dbo].[Module] [mdl]
              LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [mdl].[CreatedBy]
              LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [mdl].[UpdatedBy]
              LEFT JOIN [dbo].[Teacher] [tchr] ON [tchr].Id = [mdl].[TeacherId]
              LEFT JOIN [dbo].[Subject] [sbjct] ON [sbjct].Id = [mdl].[SubjectId]
              LEFT JOIN [dbo].[Batch] [btch] ON [btch].Id = [mdl].[BatchId]";
        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where mdl.Id = '"; }
        }
    }
}
