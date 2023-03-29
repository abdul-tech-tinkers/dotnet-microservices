using CustomerAPI.Data;
using CustomerAPI.Interfaces;
using CustomerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace CustomerAPI.Services
{
    public class CustomerService : ICustomer
    {
        private CustomerDbContext _customerDbContext;
        public CustomerService()
        {
            _customerDbContext = new CustomerDbContext();
        }
        public async Task<Customer> AddCustomer(Customer customer)
        {
            var vehicleInDb = await _customerDbContext.Vehicles.FirstOrDefaultAsync(p => p.Id == customer.VehicleId);
            if (vehicleInDb == null)
            {
                await _customerDbContext.Vehicles.AddAsync(customer.Vehicle);
                await _customerDbContext.SaveChangesAsync();
            }
            customer.Vehicle = null;
            await _customerDbContext.Customers.AddAsync(customer);
            await _customerDbContext.SaveChangesAsync();
            return customer;
        }

    }
}
