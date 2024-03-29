using MVCApplication.Services;

namespace MVCApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            //builder.Services.AddScoped<CounterService>();
            // builder.Services.AddScoped<DataManagerService>();

            builder.Services.AddScoped<CounterService>();
            builder.Services.AddScoped<DataManagerService>();
            builder.Services.AddScoped<IDatabaseManager, MongoDbManager>();

            var config = builder.Configuration;

            // add builder configuraiton 

            var settings = new Dictionary<string, string>()
            {
                {"somekey","somevalue" }
            };

            builder.Configuration
                .AddInMemoryCollection(settings)
                .AddXmlFile("xmlsettings.xml", optional:false)
                .AddKeyPerFile(  Path.Combine(Directory.GetCurrentDirectory(),"ConfigFiles"), optional: false)
                .AddCommandLine(args);


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}