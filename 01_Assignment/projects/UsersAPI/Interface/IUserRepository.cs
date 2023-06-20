using UsersAPI.Model;

namespace UsersAPI.Interface
{
    public interface IUserRepository
    {
        Task<User> CreateAsync(User user);
        Task<User> FindAsync(string name, string password);
    }
}
