using IdentityAPI.Data;
using IdentityAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IdentityAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IdentityDbContext dbContext;
        private readonly IConfiguration configuration;

        public UserController(IdentityDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }


        [HttpPost("register", Name = "UserRegistration")]
        [ProducesResponseType(200, Type = typeof(UserResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserResponse>> Register([FromBody] User user)
        {
            TryValidateModel(User);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            UserResponse userResponse = new UserResponse()
            {
                Id = user.Id,
                Email = user.Email,
                Fullname = user.Fullname,
                PhoneNumber = user.PhoneNumber
            };
            return base.Created("", userResponse);
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

            var existingUser = await dbContext.Users.SingleOrDefaultAsync(p => p.Email == model.Email && p.Password == model.Password);
            if (existingUser == null)
            {
                return NotFound();
            }

            string token = GenerateToken(existingUser);
            LoginResponseModel response = new LoginResponseModel()
            {
                Token = token,
                Email = existingUser.Email,
                FullName = existingUser.Fullname,
            };
            return base.Ok(response);

        }

        [NonAction]
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub, user.Fullname),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            //Adding scopes to token claim
            //var scopes = _configuration.GetValue<IEnumerable<string>>("Jwt:Audience");
            var scopes = new List<string>() { "MoviesAPI", "CustomerPlansAPI" };
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
