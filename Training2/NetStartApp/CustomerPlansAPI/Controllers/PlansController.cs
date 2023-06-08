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
            await customerPlansDbContext.SaveChangesAsync();
            //return Created($"/api/Plans/{plan.Id}", plan);
            return CreatedAtAction(nameof(GetPlansById), new { id = plan.Id }, plan);
        }


        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Delete(int id)
        {
            var plan = await customerPlansDbContext.Plans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }
            customerPlansDbContext.Plans.Remove(plan);
            await customerPlansDbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Plan>> Update(int id, [FromBody] Plan plan)
        {
            if (id != plan.Id)
            {
                return BadRequest();
            }
            TryValidateModel(plan);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingPlan = await customerPlansDbContext.Plans.FindAsync(id);
            if (existingPlan == null)
            {
                return NotFound();
            }
            existingPlan.Name = plan.Name;
            existingPlan.Description = plan.Description;
            existingPlan.MaxDeviceSupport= plan.MaxDeviceSupport;
            existingPlan.Features = plan.Features;
            existingPlan.MonthlyCost = plan.MonthlyCost;
            existingPlan.YearlyCost = plan.YearlyCost;
            existingPlan.QuarterlyCost = plan.QuarterlyCost;
            existingPlan.HalfYearlyCost = plan.HalfYearlyCost;

            customerPlansDbContext.Update(existingPlan);
            await customerPlansDbContext.SaveChangesAsync();

            return Ok(existingPlan);


        }
    }
}
