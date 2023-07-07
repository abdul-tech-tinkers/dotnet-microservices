using ProductsAPI.Interface;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace ProductsAPI.Messaging
{
    public class MessageSender : IMessageSender
    {
        public void SendProductMessage<T>(string hostname, string username, string password, string queueName, T message)
        {
            try
            {
                var factory = new ConnectionFactory
                {
                    HostName = hostname,
                    //Port = 8080,
                    UserName = username,
                    Password = password
                };
                var connection = factory.CreateConnection();
                using var channel = connection.CreateModel();
                channel.QueueDeclare(queueName, exclusive: false);
                var json = JsonConvert.SerializeObject(message);
                var body = Encoding.UTF8.GetBytes(json);
                channel.BasicPublish(exchange: "", routingKey: queueName, body: body);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }
    }
}
