namespace ProductsAPI.Interface
{
    public interface IMessageSender
    {
        public void SendProductMessage<T>(string queueName, T message);
    }
}
