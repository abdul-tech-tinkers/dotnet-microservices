using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using UsersAPI.Data;
using UsersAPI.Model;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace UsersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserDbContext userDbContext;
        private readonly IConfiguration configuration;

        public AuthController(UserDbContext userDbContext, IConfiguration configuration)
        {
            this.userDbContext = userDbContext;
            this.configuration = configuration;
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(RegisterResponse))]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Register(User user)
        {
            try
            {
                if (user == null)
                    return BadRequest();

                var existingUser = this.userDbContext.Users.SingleOrDefault(p => p.Name == user.Name);
                if (existingUser != null)
                {
                    return new BadRequestObjectResult($"User {user.Name} Already exists");
                }

                 await this.userDbContext.Users.AddAsync(user);
                await this.userDbContext.SaveChangesAsync();
                var response = new RegisterResponse()
                {
                    Name = user.Name,
                    Id = user.Id,
                    UserType = user.UserType
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                StatusCode((int)HttpStatusCode.InternalServerError, ex);
            }
            return BadRequest();
        }

        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(LoginResponseModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Login(LoginRequestModel model)
        {
            TryValidateModel(User);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await userDbContext.Users.SingleOrDefaultAsync(p => p.Name == model.Name && p.Password == model.Password);
            if (existingUser == null)
            {
                return NotFound();
            }

            string token = GenerateToken(existingUser);
            LoginResponseModel response = new LoginResponseModel()
            {
                Token = token,
                Name = existingUser.Name,
            };
            return base.Ok(response);

        }

        [NonAction]
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim("UserType", user.UserType.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            //Adding scopes to token claim
            //var scopes = _configuration.GetValue<IEnumerable<string>>("Jwt:Audience");
            var scopes = new List<string>() { "InventoryAPI", "ProductsAPI", "CartsAPI" };
            foreach (var scope in scopes)
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Aud, scope));
            }

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
