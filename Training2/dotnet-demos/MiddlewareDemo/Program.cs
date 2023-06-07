using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using MiddlewareDemo.Middlewares;
using static System.Net.Mime.MediaTypeNames;

namespace MiddlewareDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            // app.UseMiddleware<SampleMiddleware>();
            app.UseSample();

            app.Map("/about", (about) =>
            {
                about.Use(async (httpContext, next) =>
                {
                    await httpContext.Response.WriteAsync("<p>From Middleware for about - Request</p>");
                    await next.Invoke();
                    await httpContext.Response.WriteAsync("<p>From Middleware for about - Response</p>");
                });

                about.Use(async (httpContext, next) =>
                {
                    await httpContext.Response.WriteAsync("<p>From Middleware for about2 - Request</p>");
                    await next.Invoke();
                    await httpContext.Response.WriteAsync("<p>From Middleware for about2 - Response</p>");
                });


                about.Run(async (context) =>
                {
                    await context.Response.WriteAsync("<h3>About PAge</h3>");
                });
            });


            app.Use(async (httpContext, next) =>
            {
                await httpContext.Response.WriteAsync("<p>From Middleware Inline - Request</p>");
                await next.Invoke();
                await httpContext.Response.WriteAsync("<p>From Middleware Inline - Response</p>");
            });

            app.MapGet("/", () => "Hello World!");

            app.Run();
        }
    }
}