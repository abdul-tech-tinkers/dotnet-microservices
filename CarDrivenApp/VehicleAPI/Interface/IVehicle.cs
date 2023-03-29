using VehicleAPI.Models;

namespace VehicleAPI.Interface
{
    public interface IVehicle
    {
        Task<List<Vehicle>> GetAllVehicles();
        Task<Vehicle> GetVehicleById(int id);
        Task<Vehicle> AddVehicle(Vehicle vehicle);
        Task DeleteVehicle(int id);
        Task<Vehicle> UpdateVehicle(int id, Vehicle vehicle);
    }
}
