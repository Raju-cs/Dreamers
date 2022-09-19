using IqraBase.Service;
using System;
using IqraCommerce.Entities.StudentArea;
using IqraService.Search;
using System.Collections.Generic;
using System.Threading.Tasks;
using IqraCommerce.Helpers;
using IqraCommerce.Services.HistoryArea;
using IqraBase.Data.Models;
using IqraCommerce.Models.StudentArea;
using System.Linq;

namespace IqraCommerce.Services.StudentArea
{
    public class StudentService: IqraCommerce.Services.AppBaseService<Student>
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
                case "student":
                    name = "stdnt.[Name]";
                    break;
                default:
                    name = "stdnt." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, StudentQuery.Get());
            }
        }

    

        public override ResponseJson OnCreate(AppBaseModel model, Guid userId, bool isValid)
        {
            var studentModel = (StudentModel)model;

            studentModel.DreamersId = GenerateCode();

            return base.OnCreate(model, userId, isValid);
        }

        public async Task<ResponseList<Dictionary<string, object>>> BasicInfo(Guid Id)
        {
            using (var db = new DBService(this))
            {
                return await db.FirstOrDefault(StudentQuery.BasicInfo + Id + "'");
            }
        }

        public Response UploadImage(string fileName, Guid id, Guid userId, Guid activityId)
        {
            var studentFromRepo = Entity.Find(id);

            var temp = studentFromRepo;

            studentFromRepo.ImageURL = fileName;
            studentFromRepo.UpdatedAt = DateTime.Now;
            studentFromRepo.UpdatedBy = userId;

            ChangeHistoryService.Set(this,
                                     id,
                                     new { FileName = fileName, UserId = userId, ProductId = id },
                                     temp,
                                     studentFromRepo,
                                     "Upload/Change student image",
                                     "Image change",
                                     activityId,
                                     userId);
            SaveChange();


            return new Response(200, null, false, "successed");
        }
   
        private string GenerateCode()
        {
           // var Code = "Dreamers";
            var count = Entity.Count(e => e.IsActive && !e.IsDeleted);

            return "S" + DateTime.Now.ToString("yyMMdd") + count.ToString().PadLeft(4, '0');
            //return Code.ToString() + count.ToString().PadLeft(4, '0');
        }

        public async Task<ResponseList<List<Dictionary<string, object>>>> AutoComplete(Page page)
        {
           

            using (DBService db = new DBService())
            {
                page.SortBy = page.SortBy ?? "[Name]";
                page.filter = page.filter ?? new List<FilterModel>();

                return await db.List(page, StudentQuery.AutoComplete());
            }
        }
    }
    public class StudentQuery
    {
        public static string Get()
        {
                    return @"[stdnt].[Id]
                    ,[stdnt].[CreatedAt]
                    ,[stdnt].[CreatedBy]
                    ,[stdnt].[UpdatedAt]
                    ,[stdnt].[UpdatedBy]
                    ,[stdnt].[IsDeleted]
                    ,ISNULL([stdnt].[Remarks], '') [Remarks]
                    ,[stdnt].[ActivityId]
                    ,ISNULL([stdnt].[Name], '') [Name]
                    ,('/images/student/icon/' + [stdnt].[ImageURL]) [ImageURL]
                    ,('/images/student/small/' + [stdnt].[ImageURL]) [SmallImageURL]
                    ,[stdnt].[DreamersId]
                    ,ISNULL([stdnt].[NickName], '') [NickName]
                    ,ISNULL([stdnt].[PhoneNumber], '') [PhoneNumber]
                    ,[stdnt].[DateOfBirth]
                    ,[stdnt].[Gender]
                    ,ISNULL([stdnt].[BloodGroup], '') [BloodGroup]
                    ,ISNULL([stdnt].[Religion], '') [Religion]
                    ,ISNULL([stdnt].[Nationality], '') [Nationality]
                    ,[stdnt].[IsActive]
                    ,ISNULL([stdnt].[Class], '') [Class]
                    ,ISNULL([stdnt].[FathersEmail], '') [FathersEmail]
                    ,ISNULL([stdnt].[FathersName], '') [FathersName]
                    ,ISNULL([stdnt].[FathersOccupation], '') [FathersOccupation]
                    ,ISNULL([stdnt].[FathersPhoneNumber], '') [FathersPhoneNumber]
                    ,ISNULL([stdnt].[Group], '') [Group]
                    ,ISNULL([stdnt].[GuardiansEmail], '') [GuardiansEmail]
                    ,ISNULL([stdnt].[GuardiansName], '') [GuardiansName]
                    ,ISNULL([stdnt].[GuardiansOccupation], '') [GuardiansOccupation]
                    ,ISNULL([stdnt].[GuardiansPhoneNumber], '') [GuardiansPhoneNumber]
                    ,ISNULL([stdnt].[MothersEmail], '') [MothersEmail]
                    ,ISNULL([stdnt].[MothersName], '') [MothersName]
                    ,ISNULL([stdnt].[MothersOccupation], '') [MothersOccupation]
                    ,ISNULL([stdnt].[MothersPhoneNumber], '') [MothersPhoneNumber]
                    ,ISNULL([stdnt].[PermanantAddress], '') [PermanantAddress]
                    ,ISNULL([stdnt].[PresentAddress], '') [PresentAddress]
                    ,ISNULL([stdnt].[Section], '') [Section]
                    ,ISNULL([stdnt].[Shift], '') [Shift]
                    ,ISNULL([stdnt].[StudentCollegeName], '') [StudentCollegeName]
                    ,ISNULL([stdnt].[StudentSchoolName], '') [StudentSchoolName]
                    ,ISNULL([stdnt].[Version], '') [Version]
                    ,ISNULL([stdnt].[HomeDistrict], '') [HomeDistrict]
					,ISNULL([stdnt].[StudentNameBangla], '') [StudentNameBangla]
                    ,ISNULL([crtr].[Name], '') [Creator]
	                ,ISNULL([pdtr].[Name], '') [Updator]
                FROM [dbo].[Student] [stdnt]
                LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [stdnt].[CreatedBy]
                LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [stdnt].[UpdatedBy]";
        }
        public static string BasicInfo
        {
            get { return @"SELECT " + Get() + " Where stdnt.Id = '"; }
        }
        public static string AutoComplete()
        {
            return @"
                   SELECT  [stdnt].[Id]
                  ,[stdnt].[CreatedAt]
                  ,[stdnt].[CreatedBy]
                  ,[stdnt].[UpdatedAt]
                  ,[stdnt].[UpdatedBy]
                  ,[stdnt].[IsDeleted]
                  ,[stdnt].[Remarks]
                  ,[stdnt].[ActivityId]
                  ,[stdnt].[Name]
                  ,[stdnt].[ImageURL]
                  ,[stdnt].[DreamersId]
                  ,[stdnt].[NickName]
                  ,[stdnt].[PhoneNumber]
                  ,[stdnt].[DateOfBirth]
                  ,[stdnt].[Gender]
                  ,[stdnt].[BloodGroup]
                  ,[stdnt].[Religion]
                  ,[stdnt].[Nationality]
                  ,[stdnt].[IsActive]
                  ,[stdnt].[Class]
                  ,[stdnt].[FathersEmail]
                  ,[stdnt].[FathersName]
                  ,[stdnt].[FathersOccupation]
                  ,[stdnt].[FathersPhoneNumber]
                  ,[stdnt].[Group]
                  ,[stdnt].[GuardiansEmail]
                  ,[stdnt].[GuardiansName]
                  ,[stdnt].[GuardiansOccupation]
                  ,[stdnt].[GuardiansPhoneNumber]
                  ,[stdnt].[MothersEmail]
                  ,[stdnt].[MothersName]
                  ,[stdnt].[MothersOccupation]
                  ,[stdnt].[MothersPhoneNumber]
                  ,[stdnt].[PermanantAddress]
                  ,[stdnt].[PresentAddress]
                  ,[stdnt].[Section]
                  ,[stdnt].[Shift]
                  ,[stdnt].[StudentCollegeName]
                  ,[stdnt].[StudentSchoolName]
                  ,[stdnt].[Version]
                  ,[stdnt].[HomeDistrict]
                  ,[stdnt].[StudentNameBangla]
                   FROM [dbo].[Student] [stdnt]";
        }
    
       
    }
}
