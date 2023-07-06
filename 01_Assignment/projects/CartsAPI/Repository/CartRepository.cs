using CartsAPI.Interfaces;
using CartsAPI.Model;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace CartsAPI.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly IDistributedCache distributedCache;
        private readonly IConfiguration configuration;
        private readonly IConnectionMultiplexer connectionMultiplexer;

        public CartRepository(IDistributedCache distributedCache, IConfiguration configuration)
        {
            this.distributedCache = distributedCache;
            this.configuration = configuration;
            //this.connectionMultiplexer = connectionMultiplexer;
        }
        public async Task<CartItem> AddAsync(CartItem cartItem)
        {
            return await AddAsync(cartItem.SerializedGlobalTradeItemNumber, cartItem);
        }

        public async Task DeleteAsync(string SerializedGlobalTradeItemNumber)
        {
            await distributedCache.RemoveAsync(SerializedGlobalTradeItemNumber);
        }

        public async Task<IEnumerable<CartItem>> GetAllAsync()
        {
            var allkeys = await GetAllkeys();
            List<CartItem> items = new List<CartItem>();
            foreach(var item in allkeys)
            {
                items.Add(await GetAsync(item));    
            }
            return items;
        }

        public async Task<List<string>> GetAllkeys()
        {
            List<string> listKeys = new List<string>();
            var connectionString = configuration.GetConnectionString("RedisConnection");
            using (ConnectionMultiplexer redis = await ConnectionMultiplexer.ConnectAsync($"{connectionString},allowAdmin=true"))
            {
                var keys = redis.GetServer(connectionString).Keys();
                listKeys.AddRange(keys.Select(key => (string)key).ToList());

            }

            return listKeys;
        }

        public async Task<CartItem> GetAsync(string SerializedGlobalTradeItemNumber)
        {
            var cartItemString = await this.distributedCache.GetStringAsync(SerializedGlobalTradeItemNumber);
            if (String.IsNullOrEmpty(cartItemString))
            {
                return null;
            }
            return JsonConvert.DeserializeObject<CartItem>(cartItemString);
        }

        public async Task<CartItem> UpdateAsync(string SerializedGlobalTradeItemNumber, CartItem cartItem)
        {
            return await AddAsync(SerializedGlobalTradeItemNumber, cartItem);
        }

        private async Task<CartItem> AddAsync(string SerializedGlobalTradeItemNumber, CartItem products)
        {
            await distributedCache.SetStringAsync(SerializedGlobalTradeItemNumber,
                JsonConvert.SerializeObject(products));

            return await GetAsync(SerializedGlobalTradeItemNumber);
        }
    }
}
