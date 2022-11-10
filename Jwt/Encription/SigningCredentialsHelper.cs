using Microsoft.IdentityModel.Tokens;

namespace BlogSite.Jwt
{
    public class SigningCredentialsHelper
    {
        public static SigningCredentials CreateSigningCredentals(SecurityKey securityKey)
        {
            return new SigningCredentials(securityKey, algorithm: SecurityAlgorithms.HmacSha256Signature);
        }
    }
}
