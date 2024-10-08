using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interface;
using Microsoft.IdentityModel.Tokens;

namespace API.Services {
    public class TokenService: ITokenService {
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config) {
            var tokenKey = config["TokenKey"] ?? throw new ArgumentNullException("TokenKey is not set in configuration");
            if (tokenKey.Length < 64) throw new ArgumentException("Your key needs to be longer");
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        }

        public string CreateToken(Students student) {
            return CreateTokenInternal(student.Id, "Student");
        }

        public string CreateToken(Wardens warden) {
            return CreateTokenInternal(warden.Id, "Warden");
        }

        public string CreateToken(Guards guard) {
            return CreateTokenInternal(guard.Id, "Guard");
        }

        public string CreateToken(Admin admin) {
            return CreateTokenInternal(admin.Id, "Admin");
        }

        private string CreateTokenInternal(string userId, string role) {
            var claims = new List<Claim> {
                new(ClaimTypes.NameIdentifier, userId),
                new(ClaimTypes.Role, role)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),

                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}