using Api.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services;

public class TokenService
{
    private readonly IConfiguration config;

    public TokenService(IConfiguration config)
    {
        this.config = config;
    }

    public string CreateToken(AppUser user)
    {
        var keyFromConfig = config["TokenKey"];
        if (keyFromConfig is null)
            throw new ArgumentNullException("Token key was not found in configuration");

        var claims = new ClaimsIdentity(new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName!),
        });

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyFromConfig));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
        {
            Subject = claims,
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = credentials
        });
        return tokenHandler.WriteToken(token);
    }
}
