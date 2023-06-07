namespace MVCApplication.Services
{
    public class CounterService
    {
        public int Count { get;set; }

        public int IncrementCounter()
        {
            Count++;
            return Count;
        }
    }
}
