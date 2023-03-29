using CustomerAPI.Model;

namespace CustomerAPI.Interfaces
{
    public interface ICustomer
    {
        Task<Customer> AddCustomer(Customer customer);
    }
}
