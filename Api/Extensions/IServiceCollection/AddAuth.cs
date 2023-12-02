using Api.Data;
using Api.Entities;
using Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Api.Extensions;

public static partial class IServiceCollectionExtensions
{
    public static IServiceCollection AddAuth(
    this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentityCore<AppUser>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequireNonAlphanumeric = false;
        })
            .AddEntityFrameworkStores<DataContext>();


        var secret = config["JwtSecret"];
        if (secret is null)
            throw new ArgumentNullException("JWT secret was not found in configuration");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });

        services.AddAuthorization();

        services.AddScoped<TokenService>();

        return services;
    }
}