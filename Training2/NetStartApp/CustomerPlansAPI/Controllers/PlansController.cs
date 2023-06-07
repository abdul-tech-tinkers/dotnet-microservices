using CustomerPlansAPI.Context;
using CustomerPlansAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerPlansAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly ILogger<PlansController> logger;
        private readonly CustomerPlansDbContext customerPlansDbContext;

        public PlansController(ILogger<PlansController> logger, CustomerPlansDbContext customerPlansDbContext)
        {
            this.logger = logger;
            this.customerPlansDbContext = customerPlansDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plan>>> GetPlans()
        {
            var plans = await customerPlansDbContext.Plans.ToListAsync();
            return Ok(plans);
        }

        [HttpGet("{id:int:min(1)}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Plan>> GetPlansById(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }
            var plan = await customerPlansDbContext.Plans.FindAsync(id);
            if(plan == null)
            {
                return NotFound();
            }
            return Ok(plan);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created,Type =typeof(Plan))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Plan>> CreatePlan([FromBody] Plan plan)
        {
            TryValidateModel(plan);
            if (plan == null || !ModelState.IsValid)
            {
                return BadRequest("Invalid plan received");
            }

            await customerPlansDbContext.AddAsync(plan);
            customerPlansDbContext.SaveChanges();
            //return Created($"/api/Plans/{plan.Id}", plan);
            return CreatedAtAction(nameof(GetPlansById), new { id = plan.Id }, plan);
        }


        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Delete(int id)
        {
            var plan = await customerPlansDbContext.Plans.FindAsync(id);
            if (plan == null)
            {
                return BadRequest();
            }
            customerPlansDbContext.Plans.Remove(plan);
            customerPlansDbContext.SaveChanges();
            return NoContent();
        }
    }
}
