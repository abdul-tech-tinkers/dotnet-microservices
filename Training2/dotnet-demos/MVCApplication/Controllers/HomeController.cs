using Microsoft.AspNetCore.Mvc;
using MVCApplication.Models;
using MVCApplication.Services;
using System.Diagnostics;

namespace MVCApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DataManagerService dataManagerService;
        private readonly CounterService counterService;
        private readonly IConfiguration configuration;

        public HomeController(ILogger<HomeController> logger, DataManagerService dataManagerService, CounterService counterService, IConfiguration configuration)
        {
            _logger = logger;
            this.dataManagerService = dataManagerService;
            this.counterService = counterService;
            this.configuration = configuration;
        }

        public IActionResult Index()
        {
            ViewBag.DataManagerCounter = dataManagerService.IncrementCounter();
            ViewBag.Counter = counterService.IncrementCounter();
            ViewBag.AppName = this.configuration["MyAppName"];
            ViewBag.Developer = this.configuration.GetValue<string>("Developer");
            ViewBag.UserName = this.configuration.GetValue<string>("USERNAME");
            ViewBag.Version = this.configuration.GetValue<string>("ProjectSettings:VersionSettings:Major");

            var versionSettings = this.configuration.GetSection("ProjectSettings:VersionSettings");
            var major = versionSettings["Major"];
            var minor = versionSettings["Minor"];

            var connectionString = this.configuration.GetSection("ConnectionStrings");
            var sql = connectionString["SqlConnection"];
            var mongo = connectionString["MongoConnection"];
            var sqlConnection = this.configuration.GetConnectionString("SqlConnection");

            return View();
        }

        // method depedency injection.
        public IActionResult Privacy([FromServices]IDatabaseManager databaseManager)
        {
            ViewBag.Message = databaseManager.GetData();
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}