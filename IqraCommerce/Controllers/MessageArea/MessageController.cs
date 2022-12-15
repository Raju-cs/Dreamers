using IqraCommerce.Entities.MessageArea;
using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Entities.StudentResultArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.MessageArea;
using IqraCommerce.Services.MessageArea;
using IqraService.Search;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace IqraCommerce.Controllers.MessageArea
{
    public class MessageController: AppDropDownController<Message, MessageModel>
    {
        MessageService ___service;

        public MessageController()
        {
            service = __service = ___service = new MessageService();
        }

        public async Task<ActionResult> AllStudentMarkMessage([FromBody] MessageModel model)
        {

                var data = await ___service.AllStudentMarkMessage(model, Guid.Empty);
                return Json(data);
       
        }

        public async Task<ActionResult> SingleStudentMessage([FromForm] MessageModel model)
        {

            var data = await ___service.SingleStudentMessage(model, Guid.Empty);
            return Json(data);
        }
        public async Task<ActionResult> AllStudentAbsentMessage([FromBody] MessageModel model)
        {

            var data = await ___service.AllStudentAbsentMessage(model, Guid.Empty);
            return Json(data);
        }

        public async Task<IActionResult> PayStudentMessage([FromBody] MessageModel recordToCreate)
        {
            
            var studentPaidMessageFromDb = await ___service.GetMessageStudent( recordToCreate.PeriodId);

            var content = "";
            foreach (var messageStudent in studentPaidMessageFromDb)
            {
                
                var studnt = ___service.GetEntity<StudentModule>().FirstOrDefault(sm => sm.StudentId == messageStudent.StudentId && !sm.IsDeleted );

                content = "Student" + " " + messageStudent.StudentName + " " + "  Your fee status is: Total fees amount -  " + messageStudent.Charge + ", Total received amount - " + messageStudent.Paid + "Total pending amount - " + (messageStudent.Charge - messageStudent.Paid) + "\n" +
                             "Regards,Dreamer's ";



                /*// use the API URL here  
                string strUrl = "http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=iqrasys&password=8857b7f565b96262d2818dbe6460fdca&MsgType=TEXT&receiver=" + messageStudent.PhoneNumber + "Number&message=" + content;
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

                // use the API URL here  
                string strUrl1 = "http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=iqrasys&password=8857b7f565b96262d2818dbe6460fdca&MsgType=TEXT&receiver=" + messageStudent.GuardiansPhoneNumber + "Number&message=" + content;
                // Create a request object  
                WebRequest request1 = HttpWebRequest.Create(strUrl1);
                // Get the response back  
                HttpWebResponse res1 = (HttpWebResponse)request1.GetResponse();
                Stream s1 = (Stream)res1.GetResponseStream();
                StreamReader readStream1 = new StreamReader(s1);
                string dataString1 = readStream1.ReadToEnd();
                res1.Close();
                s1.Close();
                readStream1.Close();*/

                Message message = new Message()
                    {
                        ActivityId = Guid.Empty,
                        CreatedAt = DateTime.Now,
                        CreatedBy = Guid.Empty,
                        Id = Guid.NewGuid(),
                        StudentId = messageStudent.StudentId,
                        PeriodId = messageStudent.PeriodId,
                        ModuleId = studnt.ModuleId,
                        BatchId = studnt.BatchId,
                        SubjectId = studnt.SubjectId,
                        UpdatedAt = DateTime.Now,
                        UpdatedBy = Guid.Empty,
                        PhoneNumber = messageStudent.PhoneNumber,
                        GuardiansPhoneNumber = messageStudent.GuardiansPhoneNumber,
                        Content = content,
                        Remarks = null,

                    };
                    ___service.GetEntity<Message>().Add(message);
            }

            var response = new ResponseJson()
            {
                Data = null,
                Id = recordToCreate.Id,
                IsError = false,
                Msg = "Payment Receive Successs!"
            };

            try
            {
                __service.SaveChange();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
