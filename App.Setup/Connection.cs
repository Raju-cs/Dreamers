using System;
using System.Collections.Generic;
using System.Text;

namespace App.Setup
{
    public class Connection
    {
        public static string DBName { get { return "Coaching"; } }
        public static string ConnectionString = @"data source=DESKTOP-2UPH23H;initial catalog=Coaching;persist security info=True;user id=raju;password=123;MultipleActiveResultSets=True";


        /*  public static string DBName { get { return "dreamers"; } }
          public static string ConnectionString = @"data source=103.108.140.160,1434;initial catalog=" + DBName + ";persist security info=True;user id=devrohan;password=dev.rohan!@#123;MultipleActiveResultSets=True";
  */
        /*   public static string DBName { get { return "IqraCoaching"; } }
           public static string ConnectionString = @"data source=WIN-R0U1CF2FF91\MSSQLSERVER19;initial catalog=" + DBName + ";persist security info=True;user id=sa ;password=Iqra@Coaching$432;MultipleActiveResultSets=True";
   */
        public static string ReportConnectionString = ConnectionString;
    }
}
