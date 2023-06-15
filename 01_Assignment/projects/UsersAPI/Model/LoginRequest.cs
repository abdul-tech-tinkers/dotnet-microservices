using System.ComponentModel.DataAnnotations;

namespace UsersAPI.Model
{
    public class LoginRequestModel
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponseModel
    {
        public string Token { get; set; }
        public string Name { get; set; }
    }
}