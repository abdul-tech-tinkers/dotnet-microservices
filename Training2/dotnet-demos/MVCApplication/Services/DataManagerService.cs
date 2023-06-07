namespace MVCApplication.Services
{
    public class DataManagerService
    {
        private readonly CounterService counterService;

        public DataManagerService(CounterService counterService)
        {
            this.counterService = counterService;
        }

        public int IncrementCounter()
        {
            return counterService.IncrementCounter();
        }
    }
}
