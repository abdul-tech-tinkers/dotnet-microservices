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

        public HomeController(ILogger<HomeController> logger, DataManagerService dataManagerService, CounterService counterService)
        {
            _logger = logger;
            this.dataManagerService = dataManagerService;
            this.counterService = counterService;
        }

        public IActionResult Index()
        {
            ViewBag.DataManagerCounter = dataManagerService.IncrementCounter();
            ViewBag.Counter = counterService.IncrementCounter();
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