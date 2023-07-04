using CartsAPI.Interfaces;
using CartsAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CartsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartRepository cartsRepository;

        public CartsController(ICartRepository cartsRepository)
        {
            this.cartsRepository = cartsRepository;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(IEnumerable<CartItem>))]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetAll()
        {
            return Ok(await this.cartsRepository.GetAllAsync());
        }

        [HttpGet("{serializedGlobalTradeItemNumber}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<CartItem>>> Get(string serializedGlobalTradeItemNumber)
        {
            if (string.IsNullOrEmpty(serializedGlobalTradeItemNumber))
            {
                return BadRequest();
            }
            var CartItem = await this.cartsRepository.GetAsync(serializedGlobalTradeItemNumber);
            if (CartItem == null)
            {
                return NotFound();
            }
            return Ok(CartItem);
        }


        [HttpPost]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CartItem>> CreateCartItem([FromBody] CartItem CartItem)
        {
            TryValidateModel(CartItem);
            if (CartItem == null || !ModelState.IsValid)
            {
                return BadRequest("invalid CartItem request");
            }
            var createdCartItem = await this.cartsRepository.AddAsync(CartItem);
            return CreatedAtAction(nameof(Get), new { id = createdCartItem.SerializedGlobalTradeItemNumber }, createdCartItem);
        }

        [HttpPut("{serializedGlobalTradeItemNumber}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CartItem>> UpdateCartItem(string serializedGlobalTradeItemNumber, [FromBody] CartItem CartItem)
        {
            if (serializedGlobalTradeItemNumber != CartItem.SerializedGlobalTradeItemNumber)
            {
                return BadRequest();
            }
            TryValidateModel(CartItem);
            if (CartItem == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingCartItem = await this.cartsRepository.GetAsync(CartItem.SerializedGlobalTradeItemNumber);
            if (existingCartItem == null)
            {
                return new BadRequestObjectResult($"CartItem {CartItem.SerializedGlobalTradeItemNumber} not found");
            }

            var UpdatedCartItem = await this.cartsRepository.UpdateAsync(serializedGlobalTradeItemNumber, CartItem);
            return Ok(UpdatedCartItem);
        }

        [HttpDelete("{serializedGlobalTradeItemNumber}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteCartItem(string serializedGlobalTradeItemNumber)
        {
            var existingCartItem = await this.cartsRepository.GetAsync(serializedGlobalTradeItemNumber);
            if (existingCartItem == null)
            {
                return new BadRequestObjectResult($"CartItem {serializedGlobalTradeItemNumber} not found");
            }
            await this.cartsRepository.DeleteAsync(existingCartItem.SerializedGlobalTradeItemNumber);
            return NoContent();
        }
    }
}
