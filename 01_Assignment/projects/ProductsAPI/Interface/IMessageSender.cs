namespace ProductsAPI.Interface
{
    public interface IMessageSender
    {
        public void SendProductMessage<T>(string hostname, string username, string password, string queueName, T message);
    }
}
