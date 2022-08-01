using System;
using System.Collections.Generic;
using System.Text;

namespace App.Setup.Models
{
    public static class ErrorCodes
    {
        /// <summary>
        /// value=-1
        /// </summary>
        public static int NotLogedIn = -1;
        /// <summary>
        /// value=-2
        /// </summary>
        public static int UnAuthorized = -2;
        /// <summary>
        /// value=-3
        /// </summary>
        public static int NotFound = -3;
        /// <summary>
        /// value=-4
        /// </summary>
        public static int AlreadyExist = -4;
        /// <summary>
        /// value=-5
        /// </summary>
        public static int Validation = -5;
        /// <summary>
        /// value=-6
        /// </summary>
        public static int InternalServer = -6;
        /// <summary>
        /// value=-7
        /// </summary>
        public static int NotCreate = -7;
        /// <summary>
        /// value=-8
        /// </summary>
        public static int Network = -8;
        /// <summary>
        /// value=-9
        /// </summary>
        public static int AlreadyExistInAnother = -9;
        /// <summary>
        /// value=-10
        /// </summary>
        public static int NotAjaxCall = -10;
    }
}
