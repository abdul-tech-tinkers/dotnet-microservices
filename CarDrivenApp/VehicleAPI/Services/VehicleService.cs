using Microsoft.EntityFrameworkCore;
using VehicleAPI.Data;
using VehicleAPI.Interface;
using VehicleAPI.Models;

namespace VehicleAPI.Services
{
    public class VehicleService : IVehicle
    {
        private ApiDBContext _dbContext;
        public VehicleService()
        {
            _dbContext = new ApiDBContext();
        }

        async Task<Vehicle> IVehicle.AddVehicle(Vehicle vehicle)
        {
            await _dbContext.Vehicles.AddAsync(vehicle);
            await _dbContext.SaveChangesAsync();
            return vehicle;
        }

        async Task IVehicle.DeleteVehicle(int id)
        {
            var vehicle= await _dbContext.Vehicles.FindAsync(id);
            _dbContext.Vehicles.Remove(vehicle);
            await _dbContext.SaveChangesAsync();
        }

        async Task<List<Vehicle>> IVehicle.GetAllVehicles()
        {
            return await _dbContext.Vehicles.ToListAsync();
        }

        async Task<Vehicle> IVehicle.GetVehicleById(int id)
        {
            return await _dbContext.Vehicles.FindAsync(id);
        }

        async Task<Vehicle> IVehicle.UpdateVehicle(int id, Vehicle vehicle)
        {
            var dbVehicle = await _dbContext.Vehicles.FindAsync(id);
            dbVehicle.Name = vehicle.Name;
            dbVehicle.Width = vehicle.Width;
            dbVehicle.Price = vehicle.Price;
            dbVehicle.Length = vehicle.Length;
            dbVehicle.Displacement  = vehicle.Displacement;
            dbVehicle.ImageUrl = vehicle.ImageUrl;
            dbVehicle.MaxSpeed = vehicle.MaxSpeed;
            await _dbContext.SaveChangesAsync();
            return dbVehicle;
        }
    }
}
