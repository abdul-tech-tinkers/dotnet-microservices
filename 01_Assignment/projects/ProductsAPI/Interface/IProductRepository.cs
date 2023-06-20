using ProductsAPI.Model;

namespace ProductsAPI.Interface
{
    public interface IProductRepository
    {
        Task<Product> AddAsync(Product products);
        Task<Product> UpdateAsync(int id,Product products);
        Task<Product> DeleteAsync(int id);
        Task<Product> GetAsync(int id);
        Task<IEnumerable<Product>> GetAllAsync();
    }
}
