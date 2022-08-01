using App.Setup.LogInArea;
using IqraBase.Web.Setup;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IqraCommerce.Middleware
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AuthenticationMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public AuthenticationMiddleware(RequestDelegate next, ILogger<AuthenticationMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        private IList<string> whitelist = new List<string>()
        {
            "/Account/LogIn/",
            "/Auth/Login",
            "/Auth",
            "/LicenceArea/Licence/GetActive"
        };

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path; 

            if(whitelist.Contains(path.Value))
            {
                await _next(context);
                return;
            }


            string cookie = context.Request.Cookies[LogInQuery.AuthentiationToken],
                    header = context.Request.Headers[LogInQuery.AuthentiationToken];
            cookie = LogInQuery.AuthProcess == AuthProcessType.Cookie ? cookie : header;

            if (!string.IsNullOrEmpty(cookie))
            {
                var appLoggedIdUser = LogInService.Get(cookie, LogInQuery.GetUser);
                if(appLoggedIdUser != null && appLoggedIdUser.IsActive)
                {
                    await _next(context);
                    return;
                }
            }


            context.Response.Redirect("/Auth");
        }
    }
}
