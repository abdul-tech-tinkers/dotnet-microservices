using InventoryAPI.Interfaces;
using InventoryAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using Newtonsoft.Json;
using InventoryAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;

namespace InventoryAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IProductItemsRepository productItemsRepository;
        private readonly IConfiguration configuration;

        public InventoryController(IProductItemsRepository productItemsRepository, IConfiguration configuration)
        {
            this.productItemsRepository = productItemsRepository;
            this.configuration = configuration;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductItem>))]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetAll()
        {
            await UpdateProductsFromQueue();
            return Ok(await this.productItemsRepository.GetAllAsync());
        }

        private async Task UpdateProductsFromQueue()
        {
            try
            {
                var factory = new ConnectionFactory
                {
                    HostName = "localhost",
                    //Port = 8080,
                    UserName = "user",
                    Password = "password"
                };
                using var connection = factory.CreateConnection();
                using var channel = connection.CreateModel();
                channel.QueueDeclare("products", exclusive: false);

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += async (model, eventarg) =>
                {
                    var body = eventarg.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine(message);
                    var messageCreated = JsonConvert.DeserializeObject<string>(message);
                    if (messageCreated != null)
                    {
                        Console.WriteLine(messageCreated);
                        var optionsBuilder = new DbContextOptionsBuilder<ProductItemsDbContext>();
                        var connectionString = configuration.GetConnectionString("SqlServerConnection");
                        optionsBuilder.UseSqlServer(connectionString);
                        using (ProductItemsDbContext _context = new ProductItemsDbContext(optionsBuilder.Options))
                        {
                            var product = await _context.ProductItems.FirstOrDefaultAsync(p => p.ProductId == messageCreated);
                            if (product != null)
                            {
                                product.ReasonForCheckout = InventoryAPI.Model.CheckoutReason.RemovedFromSystem;
                                product.CheckOutDate = DateTime.Now;
                                _context.Update(product);
                                _context.SaveChanges();
                            }
                        }

                    }
                };

                //read the message
                var consume = channel.BasicConsume(queue: "products", autoAck: true, consumer: consumer);
                Console.WriteLine(consume);
                await Task.Delay(10);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(ProductItem))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ProductItem>>> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var ProductItem = await this.productItemsRepository.GetAsync(id);
            if (ProductItem == null)
            {
                return NotFound();
            }
            return Ok(ProductItem);
        }

        [HttpGet("GetDailyInventoryStatus", Name = nameof(GetDailyInventoryStatus))]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductItem>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetDailyInventoryStatus()
        {
            var ProductItem = this.productItemsRepository.FindAsync(p => p.ExpirationDate.Date >= DateTime.Now.Date && p.ReasonForCheckout == CheckoutReason.None);
            var result = new List<ProductItem>();
            if (ProductItem != null)
            {
                foreach (var item in ProductItem)
                {
                    result.Add(item);
                }
            }
            else
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("GetExpiredProductItems", Name = nameof(GetExpiredProductItems))]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductItem>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetExpiredProductItems()
        {
            var ProductItem = this.productItemsRepository.FindAsync(p => p.ExpirationDate.Date < DateTime.Now.Date);
            var result = new List<ProductItem>();
            if (ProductItem != null)
            {
                foreach (var item in ProductItem)
                {
                    result.Add(item);
                }
            }
            else
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("GetExpiredProductItemsWithReason/{reason}", Name = nameof(GetExpiredProductItemsWithReason))]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductItem>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetExpiredProductItemsWithReason(CheckoutReason reason)
        {
            var ProductItem = this.productItemsRepository.FindAsync(p => p.ExpirationDate.Date < DateTime.Now.Date && p.ReasonForCheckout == reason);
            var result = new List<ProductItem>();
            if (ProductItem != null)
            {
                foreach (var item in ProductItem)
                {
                    result.Add(item);
                }
            }
            else
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("GetProductItemExpiryInDays/{days}", Name = nameof(GetProductItemExpiryInDays))]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductItem>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetProductItemExpiryInDays(int days = 1)
        {
            if (days < 1)
            {
                return BadRequest();
            }
            var ProductItem = this.productItemsRepository.FindAsync(p => p.ExpirationDate.Date >= DateTime.Now.AddDays(days - 1).Date && p.ReasonForCheckout == CheckoutReason.None);
            var result = new List<ProductItem>();
            if (ProductItem != null)
            {
                foreach (var item in ProductItem)
                {
                    result.Add(item);
                }
            }
            else
            {
                return NotFound();
            }
            return Ok(result);
        }



        [HttpGet("{serializedGlobalTradeItemNumber}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(ProductItem))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ProductItem>>> Get(string serializedGlobalTradeItemNumber)
        {
            if (string.IsNullOrEmpty(serializedGlobalTradeItemNumber))
            {
                return BadRequest();
            }
            var ProductItem = await this.productItemsRepository.GetAsync(serializedGlobalTradeItemNumber);
            if (ProductItem == null)
            {
                return NotFound();
            }
            return Ok(ProductItem);
        }

        [HttpPost("checkin")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(ProductItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductItem>> CreateProductItem([FromBody] ProductItem productItem)
        {
            TryValidateModel(productItem);
            if (productItem == null || !ModelState.IsValid)
            {
                return BadRequest("invalid ProductItem request");
            }
            var existingProductItem = this.productItemsRepository.GetAsync(productItem.SerializedGlobalTradeItemNumber);
            if (existingProductItem != null)
            {
                return new BadRequestObjectResult($"Product Item with {productItem.SerializedGlobalTradeItemNumber} already exists");
            }
            productItem.ReasonForCheckout = CheckoutReason.None;
            var createdProduct = await this.productItemsRepository.AddAsync(productItem);
            return CreatedAtAction(nameof(Get), new { id = createdProduct.Id }, createdProduct);
        }


        [HttpPost("checkout")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(ProductItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductItem>> CheckoutProductItem([FromBody] CheckoutRequest checkoutRequest)
        {
            TryValidateModel(checkoutRequest);
            if (checkoutRequest == null || !ModelState.IsValid)
            {
                return BadRequest("invalid checkoutRequest request");
            }
            var existingProductItem = await this.productItemsRepository.GetAsync(checkoutRequest.SerializedGlobalTradeItemNumber);
            if (existingProductItem == null)
            {
                return NotFound();
            }
            existingProductItem.CheckOutDate = DateTime.Now;
            existingProductItem.ReasonForCheckout = checkoutRequest.ReasonForCheckout;
            var updatedProductItem = await this.productItemsRepository.UpdateAsync(existingProductItem.Id, existingProductItem);
            return Ok(updatedProductItem);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(ProductItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductItem>> UpdateProductItem(int id, [FromBody] ProductItem ProductItem)
        {
            if (id != ProductItem.Id)
            {
                return BadRequest();
            }
            TryValidateModel(ProductItem);
            if (ProductItem == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingProduct = await this.productItemsRepository.GetAsync(ProductItem.Id);
            if (existingProduct == null)
            {
                return new BadRequestObjectResult($"ProductItem {ProductItem.Id} not found");
            }

            var UpdatedProduct = await this.productItemsRepository.UpdateAsync(id, ProductItem);
            return Ok(UpdatedProduct);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductItem>> DeleteProductItem(int id)
        {
            var existingProduct = await this.productItemsRepository.GetAsync(id);
            if (existingProduct == null)
            {
                return new BadRequestObjectResult($"ProductItem {id} not found");
            }
            await this.productItemsRepository.DeleteAsync(existingProduct.Id);
            return NoContent();
        }
    }
}
