using IqraCommerce.Entities.BatchAttendanceArea;
using IqraCommerce.Helpers;
using IqraCommerce.Models.BatchAttendanceArea;
using IqraCommerce.Models.PeriodAttendanceArea;
using IqraCommerce.Services.BatchAttendanceArea;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IqraCommerce.Controllers.BatchAttendanceArea
{
    public class BatchAttendanceController: AppDropDownController<BatchAttendance, BatchAttendanceModel>
    {
        BatchAttendanceService ___service;

        public BatchAttendanceController()
        {
            service = __service = ___service = new BatchAttendanceService();
        }
        public ActionResult AddPresentAttendee ([FromBody] BatchAttendanceModel recordToCreate)
        {

            var batchAttendanceForDb = ___service.GetEntity<BatchAttendance>().FirstOrDefault(f => f.IsDeleted == false
                                                                                                  && f.StudentId == recordToCreate.StudentId
                                                                                                  && f.ModuleId == recordToCreate.ModuleId
                                                                                                  && f.BatchId == recordToCreate.BatchId
                                                                                                  && f.PeriodAttendanceId == recordToCreate.PeriodAttendanceId);


           batchAttendanceForDb.AttendanceTime = DateTime.Now;
           batchAttendanceForDb.EarlyLeaveTime = recordToCreate.EarlyLeaveTime;
            //batchAttendanceForDb.Status = "Present";
            


            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }


            return Ok(new Response(batchAttendanceForDb.Id, batchAttendanceForDb, false, "Success"));
        }

        public ActionResult AddEarlyLeave([FromBody] BatchAttendanceModel recordToCreate)
        {

            var batchAttendanceForDb = ___service.GetEntity<BatchAttendance>().FirstOrDefault(f => f.IsDeleted == false
                                                                                                  && f.StudentId == recordToCreate.StudentId
                                                                                                  && f.ModuleId == recordToCreate.ModuleId
                                                                                                  && f.BatchId == recordToCreate.BatchId
                                                                                                  && f.PeriodAttendanceId == recordToCreate.PeriodAttendanceId);
                                                                                                  


            batchAttendanceForDb.EarlyLeaveTime = DateTime.Now;
            batchAttendanceForDb.IsEarlyLeave = true;

            try
            {
                ___service.SaveChange();
            }
            catch (Exception ex)
            {

                return Ok(new Response(-4, ex.StackTrace, true, ex.Message));
            }


            return Ok(new Response(batchAttendanceForDb.Id, batchAttendanceForDb, false, "Success"));
        }
    }
}
