using IqraCommerce.Entities.MessageArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.MessageArea;
using IqraCommerce.Services.MessageArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace IqraCommerce.Controllers.MessageArea
{
    public class MessageController: AppDropDownController<Message, MessageModel>
    {
        MessageService ___service;

        public MessageController()
        {
            service = __service = ___service = new MessageService();
        }

        public ActionResult SingleMessage([FromForm] MessageModel recordToCreate)
        {

            var singleMessageForDb = ___service.GetEntity<Message>().FirstOrDefault(s => s.IsDeleted == false
                                                                                                  && s.PhoneNumber == recordToCreate.PhoneNumber
                                                                                                  && s.Id == recordToCreate.Id);


            /*singleMessageForDb.PhoneNumber = "01818524317";
            singleMessageForDb.Content = "cvkdshhhhhuihgi";*/



            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }


            return Ok(new Response(singleMessageForDb.Id, singleMessageForDb, false, "Success"));
        }

        public ActionResult MultipleMessage([FromForm] MessageModel recordToCreate)
        {

            var multipleMessageForDb = ___service.GetEntity<Message>().FirstOrDefault(sm => sm.IsDeleted == false
                                                                                                  && sm.PhoneNumber == recordToCreate.PhoneNumber
                                                                                                  && sm.Id == recordToCreate.Id);


            /* studentResultForDb.Status = "Present";
             studentResultForDb.Mark = recordToCreate.Mark;*/



            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }


            return Ok(new Response(multipleMessageForDb.Id, multipleMessageForDb, false, "Success"));
        }
    }
}
