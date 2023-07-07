using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.Identity;
using ProductsAPI.Interface;
using ProductsAPI.Model;
using System.Net;
using System.Numerics;

namespace ProductsAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository productRepository;
        private readonly IMessageSender messageSender;
        private readonly IConfiguration configuration;

        public ProductController(IProductRepository productRepository, IMessageSender messageSender, IConfiguration configuration)
        {
            this.productRepository = productRepository;
            this.messageSender = messageSender;
            this.configuration = configuration;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<Product>))]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            return Ok(await this.productRepository.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Product>>> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var product = await this.productRepository.GetAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // GlobalTradeItemNumber

        [HttpGet("{globalTradeItemNumber}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Product>>> Get(string globalTradeItemNumber)
        {
            if (string.IsNullOrEmpty(globalTradeItemNumber))
            {
                return BadRequest();
            }
            var product = await this.productRepository.GetAsync(globalTradeItemNumber);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [Authorize(Policy = IdentityData.G0_PolicyName)]
        [HttpPost]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Product>> RegisterProduct([FromBody] Product product)
        {
            TryValidateModel(product);
            if (product == null || !ModelState.IsValid)
            {
                return BadRequest("invalid product request");
            }

            var existingProduct = await this.productRepository.GetAsync(product.GlobalTradeItemNumber);
            if (existingProduct != null)
            {
                return new BadRequestObjectResult($"Product with GTIN {product.GlobalTradeItemNumber} already exists");
            }

            product.IsActive = true;
            var createdProduct = await this.productRepository.AddAsync(product);
            return CreatedAtAction(nameof(Get), new { id = createdProduct.Id }, createdProduct);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = IdentityData.G0_PolicyName)]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Product>> UpdateProduct(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            TryValidateModel(product);
            if (product == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingProduct = await this.productRepository.GetAsync(product.Id);
            if (existingProduct == null)
            {
                return new BadRequestObjectResult($"Product {product.Id} not found");
            }

            var UpdatedProduct = await this.productRepository.UpdateAsync(id, product);
            return Ok(UpdatedProduct);
        }

        [HttpPost("{id}", Name = "De Register Product")]
        [Authorize(Policy = IdentityData.G0_PolicyName)]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Product>> DeRegisterProduct(int id)
        {
            try
            {
                var existingProduct = await this.productRepository.GetAsync(id);
                if (existingProduct == null)
                {
                    return new BadRequestObjectResult($"Product {id} not found");
                }
                existingProduct.IsActive = false;
                var UpdatedProduct = await this.productRepository.UpdateAsync(existingProduct.Id, existingProduct);

                var hostName = this.configuration.GetValue<string>("RabbitmqQueue:HostName");
                var userName = this.configuration.GetValue<string>("RabbitmqQueue:UserName");
                var password = this.configuration.GetValue<string>("RabbitmqQueue:Password");
                var queueName = this.configuration.GetValue<string>("RabbitmqQueue:ProductsQueueName");

                // send the product details to queue to mark the inventory as CheckoutReason as RemovedFromSystem
                this.messageSender.SendProductMessage(hostName, userName, password, queueName, UpdatedProduct.GlobalTradeItemNumber);

                return Ok(UpdatedProduct);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
