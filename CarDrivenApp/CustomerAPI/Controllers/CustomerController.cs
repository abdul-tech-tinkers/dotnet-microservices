using CustomerAPI.Interfaces;
using CustomerAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomer customer;

        public CustomerController(ICustomer customerService)
        {
            this.customer = customerService;
        }
        //// GET: api/<CustomerController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<CustomerController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<CustomerController>
        [HttpPost]
        public async Task<Customer> Post([FromBody] Customer customer)
        {
            var _customer = await this.customer.AddCustomer(customer);
            SendToQueue(_customer);

            return _customer;
        }

        private void SendToQueue(Customer customer)
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
            var json = JsonConvert.SerializeObject(customer);
            var body  = Encoding.UTF8.GetBytes(json);
            channel.BasicPublish(exchange:"", routingKey:"customers", body: body);  
        }

        //// PUT api/<CustomerController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<CustomerController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
