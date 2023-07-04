using ProductsAPI.Model;

namespace ProductsAPI.Interface
{
    public interface IProductRepository
    {
        Task<Product> AddAsync(Product products);
        Task<Product> UpdateAsync(int id,Product products);
        Task DeleteAsync(int id);
        Task<Product> GetAsync(int id);
        Task<Product> GetAsync(string globalTradeItemNumber);
        Task<IEnumerable<Product>> GetAllAsync();
    }
}
