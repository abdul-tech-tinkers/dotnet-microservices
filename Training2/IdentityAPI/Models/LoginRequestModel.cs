using System.ComponentModel.DataAnnotations;

namespace IdentityAPI.Models
{
    public class LoginRequestModel
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponseModel
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
