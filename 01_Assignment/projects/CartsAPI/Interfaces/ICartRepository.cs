using CartsAPI.Model;

namespace CartsAPI.Interfaces
{
    public interface ICartRepository
    {
        Task<CartItem> AddAsync(CartItem cartItem);
        Task<CartItem> UpdateAsync(string SerializedGlobalTradeItemNumber, CartItem cartItem);
        Task DeleteAsync(string SerializedGlobalTradeItemNumber);
        Task<CartItem> GetAsync(string SerializedGlobalTradeItemNumber);
        Task<IEnumerable<CartItem>> GetAllAsync();
    }
}
