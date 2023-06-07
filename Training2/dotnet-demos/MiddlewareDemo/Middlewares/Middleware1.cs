using Microsoft.AspNetCore.Http;
using static System.Net.Mime.MediaTypeNames;

namespace MiddlewareDemo.Middlewares
{
    public class Middleware1
    {
        RequestDelegate _next;
        public Middleware1(RequestDelegate next)
        {
            this._next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            httpContext.Response.ContentType = "text/html";
            await httpContext.Response.WriteAsync("<p>From Middleware1 - Request</p>");
            await _next.Invoke(httpContext);
            await httpContext.Response.WriteAsync("<p>From Middleware1 - Response</p>");
        }
    }

    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseSample(this WebApplication application)
        {
            return application.UseMiddleware<Middleware1>();
        }
    }
}
