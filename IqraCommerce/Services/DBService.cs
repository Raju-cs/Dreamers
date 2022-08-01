using IqraService.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Services
{
    public class DBService : IqraDBService
    {

        public DBService() : base(Startup.ConnectionString)
        {

        }
        public DBService(string conString) : base(conString)
        {

        }
        public DBService(INameService nameService) : base(Startup.ConnectionString, nameService)
        {

        }
        public DBService(string ConnectionString, INameService nameService) : base(ConnectionString, nameService)
        {

        }
    }
}
