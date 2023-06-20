using Microsoft.EntityFrameworkCore;
using ProductsAPI.Data;
using ProductsAPI.Interface;
using ProductsAPI.Model;
using System.Collections;

namespace ProductsAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductsDbContext dbContext;

        public ProductRepository(ProductsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Product> AddAsync(Product products)
        {
            products.CreatedDate = DateTime.Now;
            products.UpdatedDate = DateTime.Now;
            await this.dbContext.Products.AddAsync(products);
            await Save();
            return products;

        }

        public async Task<Product> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await dbContext.Products.ToListAsync();
        }

        public async Task<Product> GetAsync(int id)
        {
            return await dbContext.Products.FindAsync(id);
        }

        public async Task<Product> UpdateAsync(int id, Product products)
        {
            var existingProduct = await dbContext.Products.FindAsync(id);
            if (existingProduct != null)
            {
                existingProduct.Name = products.Name;
                existingProduct.MaterialNumber = products.MaterialNumber;
                existingProduct.UnitOfMeasure = products.UnitOfMeasure;
                existingProduct.MaterialNumber = products.MaterialNumber;
                existingProduct.Vendoer= products.Vendoer;
                existingProduct.CreatedDate =products.CreatedDate;
                existingProduct.GlobalTradeItemNumber = products.GlobalTradeItemNumber;
                products.UpdatedDate = DateTime.Now; // the product is updated now.
                existingProduct.IsActive = products.IsActive;
                existingProduct.ProductCategory = products.ProductCategory;

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
