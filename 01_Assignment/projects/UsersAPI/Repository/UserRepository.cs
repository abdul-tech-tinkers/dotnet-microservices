using Microsoft.EntityFrameworkCore;
using UsersAPI.Data;
using UsersAPI.Interface;
using UsersAPI.Model;

namespace UsersAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext userDbContext;

        public UserRepository(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
        public async Task<User> CreateAsync(User user)
        {
            await this.userDbContext.Users.AddAsync(user);
            await this.userDbContext.SaveChangesAsync();
            return user;

        }

        public async Task<User> FindAsync(string name, string password)
        {
            var foundUser = await this.userDbContext.Users.SingleOrDefaultAsync(p => p.Name == name && p.Password == password);
            return foundUser;
        }
    }
}
