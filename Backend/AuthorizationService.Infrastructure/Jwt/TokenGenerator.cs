using AuthorizationService.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthorizationService.Infrastructure.Jwt
{
    internal class TokenGenerator : ITokenGenerator
    {
        private readonly IConfiguration _configuration;
        private readonly byte[] _key;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly DateTime _expirationDate;
        private readonly DateTime _expirationRefreshTokenDate;

        public TokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
            var jwtSettings = _configuration.GetSection("Jwt");
            this._key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);
            this._expirationDate = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiryMinutes"]));
            this._expirationRefreshTokenDate = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["RefreshTokenExpiryMinutes"]));
            this._issuer = jwtSettings["Issuer"];
            this._audience = jwtSettings["Audience"];
        }

        public (string token, DateTime expirationDate) GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Name, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: this._issuer,
                audience: this._audience,
                claims: claims,
                expires: this._expirationDate,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256)
            );

            return (new JwtSecurityTokenHandler().WriteToken(token), this._expirationDate);
        }

        public (string refreshToken, DateTime expirationDate) GenerateJwtRefreshToken(string user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Name, user),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var refreshToken = new JwtSecurityToken(
               issuer: this._issuer,
               audience: this._audience,
               claims: claims,
               expires: this._expirationRefreshTokenDate,
               signingCredentials: new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256)
           );

            return (new JwtSecurityTokenHandler().WriteToken(refreshToken), this._expirationRefreshTokenDate);
        }
    }
}
