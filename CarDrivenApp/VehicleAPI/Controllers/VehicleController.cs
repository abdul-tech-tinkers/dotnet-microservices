using Microsoft.AspNetCore.Mvc;
using VehicleAPI.Interface;
using VehicleAPI.Models;

namespace VehicleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private IVehicle _vehicle;

        public VehicleController(IVehicle vehicle)
        {
            this._vehicle = vehicle;
        }
        // GET: api/<VehicleController>
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> Get()
        {
            return await _vehicle.GetAllVehicles();
        }

        // GET api/<VehicleController>/5
        [HttpGet("{id}")]
        public Task<Vehicle> Get(int id)
        {
            return _vehicle.GetVehicleById(id);
        }

        // POST api/<VehicleController>
        [HttpPost]
        public async Task Post([FromBody] Vehicle vehicle)
        {
            await _vehicle.AddVehicle(vehicle);
        }

        // PUT api/<VehicleController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] Vehicle vehicle)
        {
            await _vehicle.UpdateVehicle(id, vehicle);
        }

        // DELETE api/<VehicleController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _vehicle.DeleteVehicle(id);
        }
    }
}
