using InventoryAPI.Data;
using InventoryAPI.Interfaces;
using InventoryAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace InventoryAPI.Repository
{
    public class ProductItemsRepository : IProductItemsRepository
    {
        private readonly ProductItemsDbContext dbContext;

        public ProductItemsRepository(ProductItemsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<ProductItem> AddAsync(ProductItem productItem)
        {
            await this.dbContext.ProductItems.AddAsync(productItem);
            await Save();
            return productItem;
        }

        public async Task DeleteAsync(int id)
        {
            var existingItem = await GetAsync(id);
            if (existingItem != null)
            {
                this.dbContext.ProductItems.Remove(existingItem);
                await Save();
            }
        }

        public async Task<IEnumerable<ProductItem>> GetAllAsync()
        {
            return await dbContext.ProductItems.ToListAsync();
        }

        public async Task<ProductItem> GetAsync(int id)
        {
            return await dbContext.ProductItems.FindAsync(id);
        }

        public IQueryable<ProductItem> FindAsync(System.Linq.Expressions.Expression<Func<ProductItem, bool>> predicate)
        {
            return dbContext.ProductItems.Where(predicate);
        }

        public Task<ProductItem> GetByProductIdAsync(string productId)
        {
            return dbContext.ProductItems.FirstOrDefaultAsync(p => p.ProductId.ToLower() == productId.ToLower());
        }

        public Task<ProductItem> GetAsync(string serializedGlobalTradeItemNumber)
        {
            return dbContext.ProductItems.FirstOrDefaultAsync(p => p.SerializedGlobalTradeItemNumber.ToLower() == serializedGlobalTradeItemNumber.ToLower());
        }

        public async Task<ProductItem> UpdateAsync(int id, ProductItem productItem)
        {
            var existingProduct = await dbContext.ProductItems.FindAsync(id);
            if (existingProduct != null)
            {
                existingProduct.Lot = productItem.Lot;
                existingProduct.SerializedGlobalTradeItemNumber = productItem.SerializedGlobalTradeItemNumber;
                existingProduct.ExpirationDate = productItem.ExpirationDate;
                existingProduct.ReasonForCheckout = productItem.ReasonForCheckout;
                existingProduct.CheckInDate = productItem.CheckInDate;
                existingProduct.CheckOutDate = productItem.CheckOutDate;
                await Save();
                return existingProduct;
            }
            return null;
        }
        Task Save()
        {
            return this.dbContext.SaveChangesAsync();
        }
    }
}
