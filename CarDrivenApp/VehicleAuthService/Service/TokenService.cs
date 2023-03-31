using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VehicleAuthService.Interface;

namespace VehicleAuthService.Service
{
    public class TokenService: ITokenService
    {
        private TimeSpan ExpiryDuration = new TimeSpan(0, 30, 0);
        string ITokenService.BuildToken(string key, string issuer, IEnumerable<string> audience, string username)
        {
            var claims = new List<Claim>()
 {
 new Claim(JwtRegisteredClaimNames.UniqueName,username)
 };
            claims.AddRange(audience.Select(aud => new Claim(JwtRegisteredClaimNames.Aud, aud)));
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var creadentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tockenDescriptor = new JwtSecurityToken(issuer, issuer, claims,
            expires: DateTime.Now.Add(ExpiryDuration), signingCredentials: creadentials);
            return new JwtSecurityTokenHandler().WriteToken(tockenDescriptor);
        }
    }
}
