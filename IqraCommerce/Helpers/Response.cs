using IqraService.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Helpers
{
    public class Response : ResponseJson
    {
        private string v;

        public Response(string v)
        {
            this.v = v;
        }

        public Response(object id, object data, bool isError, string message)
        {
            Id = id;
            Data = data;
            IsError = isError;
            Msg = message;
        }
    }
}
