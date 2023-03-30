using ReservationAPI.Interface;
using ReservationAPI.Models;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using Newtonsoft.Json;
using ReservationAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace ReservationAPI.Service
{
    public class ReservationService : IReservation
    {
        private ApiDbContext _db;
        public ReservationService(ApiDbContext db)
        {
            _db = db;
        }
        public async Task<List<Reservation>> GetReservations()
        {
            var factory = new ConnectionFactory
            {
                HostName = "localhost",
                //Port = 15672,
                //UserName = "guest",
                //Password="guest"
            };
            var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.QueueDeclare("customers", exclusive: false);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += async (model, eventarg) =>
            {
                _db = new ApiDbContext();
                 var body = eventarg.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var messageCreated = JsonConvert.DeserializeObject<Reservation>(message);
                if (messageCreated != null)
                {
                    await _db.Reservations.AddAsync(messageCreated);
                    await _db.SaveChangesAsync();
                }
            };
            channel.BasicConsume(queue: "customers", autoAck: true, consumer: consumer);
            return await _db.Reservations.ToListAsync();
        }


        public Task UpdateMailStatus(int id)
        {
            throw new NotImplementedException();
        }
    }
}
