using IqraBase.Service;
using IqraCommerce.Entities.BatchAttendanceArea;
using IqraCommerce.Entities.MessageArea;
using IqraCommerce.Entities.StudentArea;
using IqraCommerce.Entities.StudentMessageStatusArea;
using IqraCommerce.Entities.StudentResultArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.MessageArea;
using IqraCommerce.Models.StudentMessageStatusArea;
using IqraService.Search;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace IqraCommerce.Services.MessageArea
{
    public class MessageService: IqraCommerce.Services.AppBaseService<Message>
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
                case "message":
                    name = "msg.[Name]";
                    break;

                default:
                    name = "msg." + name;
                    break;
            }
            return base.GetName(name);
        }

        public override async Task<ResponseList<Pagger<Dictionary<string, object>>>> Get(Page page)
        {
            page.SortBy = (page.SortBy == null || page.SortBy == "") ? "[CreatedAt] DESC" : page.SortBy;
            using (var db = new DBService(this))
            {
                return await db.GetPages(page, MessageQuery.Get());
            }
        }

        public async Task<List<StudentPaidMessage>> GetMessageStudent(Guid periodId)
        {
            using (var db = new DBService())
            {
                var res = await db.List<StudentPaidMessage>(MessageQuery.GetMessageStudent( periodId.ToString()));
                
                return res.Data;
            }
        }
        public async Task<ResponseJson> AllStudentAbsentMessage(MessageModel model, Guid userId)
        {
            return await CallbackAsync((response) =>
            {

                try
                {

                    var messageEntity = GetEntity<Message>();
                    var studentResultDb = GetEntity<BatchAttendance>().Where(ba => ba.ModuleId == model.ModuleId
                                                                                                   && ba.BatchId == model.BatchId && ba.AttendanceTime == null).ToList();

                  

                    foreach (var AbsentSms in studentResultDb)
                    {


                        var studnt = GetEntity<Student>().Where(s => s.Id == AbsentSms.StudentId && !s.IsDeleted && s.IsActive).ToList();
                        var content = "";

                        foreach (var item2 in studnt)
                        {
                          
                                content = "Student" + " " + item2.Name + " " + " was absent todays class."  + " \n" +
                                 "Regards,Dreamer's ";


                            if(model.Name == "StudentNumber")
                            {
                                // use the API URL here  
                                string strUrl = "http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=iqrasys&password=8857b7f565b96262d2818dbe6460fdca&MsgType=TEXT&receiver=" + item2.PhoneNumber + "Number&message=" + content.ToString();
                                // Create a request object  
                                WebRequest request = HttpWebRequest.Create(strUrl);
                                // Get the response back  
                                HttpWebResponse res = (HttpWebResponse)request.GetResponse();
                                Stream s = (Stream)res.GetResponseStream();
                                StreamReader readStream = new StreamReader(s);
                                string dataString = readStream.ReadToEnd();
                                res.Close();
                                s.Close();
                                readStream.Close();
                            }
                            else
                            {
                                // use the API URL here  
                                string strUrl1 = "http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=iqrasys&password=8857b7f565b96262d2818dbe6460fdca&MsgType=TEXT&receiver=" + item2.GuardiansPhoneNumber + "Number&message=" + content.ToString();
                                // Create a request object  
                                WebRequest request1 = HttpWebRequest.Create(strUrl1);
                                // Get the response back  
                                HttpWebResponse res1 = (HttpWebResponse)request1.GetResponse();
                                Stream s1 = (Stream)res1.GetResponseStream();
                                StreamReader readStream1 = new StreamReader(s1);
                                string dataString1 = readStream1.ReadToEnd();
                                res1.Close();
                                s1.Close();
                                readStream1.Close();

                            }

                            Message message = new Message()
                            {
                                ActivityId = Guid.Empty,
                                CreatedAt = DateTime.Now,
                                CreatedBy = Guid.Empty,
                                Id = Guid.NewGuid(),
                                StudentId = AbsentSms.StudentId,
                                ModuleId = AbsentSms.ModuleId,
                                BatchId = AbsentSms.BatchId,
                                SubjectId = model.SubjectId,
                                PeriodId = model.PeriodId,
                                UpdatedAt = DateTime.Now,
                                UpdatedBy = Guid.Empty,
                                PhoneNumber = item2.PhoneNumber,
                                GuardiansPhoneNumber = item2.GuardiansPhoneNumber,
                                Content = content,
                                Remarks = null,

                            };
                            messageEntity.Add(message);
                            SaveChange();
                        }
                    }
                }


                catch (Exception ex)
                {

                    ex.Message.ToString();
                }
            });
        }
        public async Task<ResponseJson> AllStudentMarkMessage(MessageModel model, Guid userId)
        {
            return await CallbackAsync((response) =>
            {

                try
                {

                    var messageEntity = GetEntity<Message>();
                    var studentResultDb = GetEntity<StudentResult>().Where(sr => sr.ModuleId == model.ModuleId
                                                                                                   && sr.BatchId == model.BatchId).ToList();



                    foreach (var item in studentResultDb)
                    {

                     
                        var studnt = GetEntity<Student>().Where(s => s.Id == item.StudentId && !s.IsDeleted && s.IsActive).ToList();
                        var content = "";

                          foreach(var item2 in studnt)
                        {
                            if(item.Status == "Present")
                            {
                                 content = "Student" + " " + item2.Name + " " + " have got " + item.Mark + " out of"+ item.ExamBandMark +"for the " + item.Name + " exam conducted on " + item.ExamDate + "\n" +
                                 "Regards,Dreamer's ";
                            }
                            else
                            {
                                content = "Student" + " " + item2.Name + " " + "was " + item.Status  + " on " + item.ExamDate + "\n" + "for " + item.Name + " exam" +  "\n" +
                                 "Regards,Dreamer's ";
                            }


                            if(model.Name == "StudentNumber") {
                                // use the API URL here  
                                string strUrl = "http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=iqrasys&password=8857b7f565b96262d2818dbe6460fdca&MsgType=TEXT&receiver=" + item2.PhoneNumber + "Number&message=" + content.ToString();
                                // Create a request object  
                                WebRequest request = HttpWebRequest.Create(strUrl);
                                // Get the response back  
                                HttpWebResponse res = (HttpWebResponse)request.GetResponse();
                                Stream s = (Stream)res.GetResponseStream();
                                StreamReader readStream = new StreamReader(s);
                                string dataString = readStream.ReadToEnd();
                                res.Close();
                                s.Close();
                                readStream.Close();

                            }
                            else
                            {
                                // use the API URL here  
                                string strUrl1 = "http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=iqrasys&password=8857b7f565b96262d2818dbe6460fdca&MsgType=TEXT&receiver=" + item2.GuardiansPhoneNumber + "Number&message=" + content.ToString();
                                // Create a request object  
                                WebRequest request1 = HttpWebRequest.Create(strUrl1);
                                // Get the response back  
                                HttpWebResponse res1 = (HttpWebResponse)request1.GetResponse();
                                Stream s1 = (Stream)res1.GetResponseStream();
                                StreamReader readStream1 = new StreamReader(s1);
                                string dataString1 = readStream1.ReadToEnd();
                                res1.Close();
                                s1.Close();
                                readStream1.Close();
                            }

                            Message message = new Message()
                            {
                                ActivityId = Guid.Empty,
                                CreatedAt = DateTime.Now,
                                CreatedBy = Guid.Empty,
                                Id = Guid.NewGuid(),
                                StudentId = item.StudentId,
                                ModuleId = item.ModuleId,
                                BatchId = item.BatchId,
                                SubjectId = item.SubjectId,
                                PeriodId = item.BatchExamId,
                                UpdatedAt = DateTime.Now,
                                UpdatedBy = Guid.Empty,
                                PhoneNumber = item2.PhoneNumber,
                                GuardiansPhoneNumber = item2.GuardiansPhoneNumber,
                                Content = content,
                                Remarks = null,

                            };
                            messageEntity.Add(message);
                            SaveChange();
                        }
                    }
                }

                  
                catch (Exception ex)
                {

                    ex.Message.ToString();
                }
            });
        }
        public async Task<ResponseJson> SingleStudentMessage(MessageModel model, Guid userId)
        {
            return await CallbackAsync((response) =>
            {

                try
                {


                    /*// use the API URL here  
                    string strUrl = "http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=iqrasys&password=8857b7f565b96262d2818dbe6460fdca&MsgType=TEXT&receiver=" + model.PhoneNumber + "Number&message=" + model.Content;
                    // Create a request object  
                    WebRequest request = HttpWebRequest.Create(strUrl);
                    // Get the response back  
                    HttpWebResponse res = (HttpWebResponse)request.GetResponse();
                    Stream s = (Stream)res.GetResponseStream();
                    StreamReader readStream = new StreamReader(s);
                    string dataString = readStream.ReadToEnd();
                    res.Close();
                    s.Close();
                    readStream.Close();

       */

                          Message message = new Message()
                            {
                                ActivityId = Guid.Empty,
                                CreatedAt = DateTime.Now,
                                CreatedBy = Guid.Empty,
                                Id = Guid.NewGuid(),
                                StudentId = model.StudentId,
                                ModuleId = model.ModuleId,
                                BatchId = model.BatchId,
                                SubjectId = model.SubjectId,
                                UpdatedAt = DateTime.Now,
                                UpdatedBy = Guid.Empty,
                                PhoneNumber = model.PhoneNumber,
                                Content = model.Content,
                                Remarks = null,

                            };
                            GetEntity<Message>().Add(message);
                            SaveChange();
                }


                catch (Exception ex)
                {

                    ex.Message.ToString();
                }
            });
        }
    }

    public class MessageQuery
    {
        public static string Get()
        {
            return @"[msg].[Id]
              ,[msg].[CreatedAt]
              ,[msg].[CreatedBy]
              ,[msg].[UpdatedAt]
              ,[msg].[UpdatedBy]
              ,[msg].[IsDeleted]
              ,ISNULL([msg].[Remarks], '') [Remarks]
              ,[msg].[ActivityId]
              ,[msg].[Name]
              ,[msg].[StudentId]
              ,[msg].[ModuleId]
              ,[msg].[BatchId]
              ,[msg].[SubjectId]
			  ,ISNULL(stdnt.Name, '') [StudentName]
			  ,ISNULL(mdl.Name, '') [ModuleName]
			  ,ISNULL(btch.Name, '') [BatchName]
			  ,ISNULL(sbjct.Name, '') [SubjectName]
              ,ISNULL([msg].[PhoneNumber], '') [PhoneNumber]
              ,ISNULL([msg].[GuardiansPhoneNumber], '') [GuardiansPhoneNumber]
              ,ISNULL([msg].[Content], '') [Content]
	          ,ISNULL([crtr].Name, '') [Creator]
	          ,ISNULL([pdtr].Name, '') [Updator] 
          FROM [dbo].[Message] [msg]
          LEFT JOIN [dbo].[User] [crtr] ON [crtr].Id = [msg].[CreatedBy]
          LEFT JOIN [dbo].[User] [pdtr] ON [pdtr].Id = [msg].[UpdatedBy]
          LEFT JOIN [dbo].Student stdnt ON stdnt.Id = [msg].[StudentId]
          LEFT JOIN [dbo].Module mdl ON mdl.Id = [msg].[ModuleId]
          LEFT JOIN [dbo].Batch btch ON btch.Id = [msg].[BatchId]
          LEFT JOIN [dbo].Subject sbjct ON sbjct.Id = [msg].[SubjectId]";
        }

        public static string GetMessageStudent( string periodId)
        {
            return @"Select* from ( 
                        select 
                            distinct stdnt.Id [StudentId], 
							stdnt.DreamersId [DreamersId],
                            stdnt.Name as [StudentName],
                            stdnt.PhoneNumber [PhoneNumber],
							stdnt.GuardiansPhoneNumber [GuardiansPhoneNumber],
                            sum(stdntmdl.Charge) [Charge], 
							sum(stdntmdl.Charge) -  (SELECT 
                                ISNULL( SUM(fs.Fee), 0) 
                            FROM Fees fs 
                            WHERE PeriodId = '" + periodId + @"' 
                            and fs.StudentId = stdnt.Id ) [Due],
                            (SELECT 
                                ISNULL( SUM(fs.Fee), 0) 
                            FROM Fees fs 
                            WHERE PeriodId = '" + periodId + @"' 
                            and fs.StudentId = stdnt.Id ) [Paid]
                        from ModulePeriod mdlprd
                        left join StudentModule stdntmdl on stdntmdl.Id = mdlprd.StudentModuleId
                        left join Student stdnt on stdnt.Id = stdntmdl.StudentId 
                        left join Period prd on prd.Id = mdlprd.PriodId
                         where mdlprd.PriodId = '" + periodId + @"'   and stdntmdl.IsDeleted = 0
                        group by stdnt.Id, 
                                 stdnt.Name,
                                 stdnt.PhoneNumber,
								 stdnt.GuardiansPhoneNumber,
								 stdnt.DreamersId)item";
        }
    }
}
