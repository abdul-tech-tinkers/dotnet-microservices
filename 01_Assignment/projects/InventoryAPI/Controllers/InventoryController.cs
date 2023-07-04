using InventoryAPI.Interfaces;
using InventoryAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IProductItemsRepository productItemsRepository;

        public InventoryController(IProductItemsRepository productItemsRepository)
        {
            this.productItemsRepository = productItemsRepository;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductItem>))]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetAll()
        {
            return Ok(await this.productItemsRepository.GetAllAsync());
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
        public async Task<ActionResult<ProductItem>> CreateProductItem([FromBody] ProductItem ProductItem)
        {
            TryValidateModel(ProductItem);
            if (ProductItem == null || !ModelState.IsValid)
            {
                return BadRequest("invalid ProductItem request");
            }
            var createdProduct = await this.productItemsRepository.AddAsync(ProductItem);
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
            if(existingProductItem == null)
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
