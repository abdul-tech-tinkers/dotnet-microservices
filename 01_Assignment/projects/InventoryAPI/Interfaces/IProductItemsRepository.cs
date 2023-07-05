using InventoryAPI.Model;

namespace InventoryAPI.Interfaces
{
    public interface IProductItemsRepository
    {
        Task<ProductItem> AddAsync(ProductItem productItem);
        Task<ProductItem> UpdateAsync(int id, ProductItem productItem);
        Task DeleteAsync(int id);
        Task<ProductItem> GetAsync(int id);
        Task<ProductItem> GetByProductIdAsync(string productId);
        Task<ProductItem> GetAsync(string serializedGlobalTradeItemNumber);
        IQueryable<ProductItem> FindAsync(System.Linq.Expressions.Expression<Func<ProductItem, bool>> predicate);
        Task<IEnumerable<ProductItem>> GetAllAsync();
    }
}
