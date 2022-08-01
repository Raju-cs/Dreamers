using IqraBase.Data;
using IqraBase.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EBonik.Data.Entities.HistoryArea
{

    [Table("ChangeHistory")]
    [Alias("chnghstr")]
    public class ChangeHistory : AppBaseEntity
    {
        public Guid EntityId { get; set; }
        /// <summary>
        /// From Which Table
        /// EX. BillPayment|Expense|SuplierPayment|ManualJournal
        /// </summary>
        public string ChangeFrom { get; set; }
        /// <summary>
        /// Column Changed.
        /// ItemReceive=>EXPDate|ItemReceive=>TP
        /// </summary>
        public string ChangeType { get; set; }
        /// <summary>
        /// Any Amount Need
        /// </summary>
        public double Amount { get; set; }
        public string Before { get; set; }
        /// <summary>
        /// Change as Json
        /// </summary>
        public string Change { get; set; }
        /// <summary>
        /// After as Json
        /// </summary>
        public string After { get; set; }
        /// <summary>
        /// Extra Info
        /// </summary>
        public string Info { get; set; }
    }
}
