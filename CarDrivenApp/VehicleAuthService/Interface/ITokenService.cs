using System.Collections.Generic;

namespace VehicleAuthService.Interface
{
    public interface ITokenService
    {
        string BuildToken(string key, string issuer, IEnumerable<string> audience, string userName);
    }
}
