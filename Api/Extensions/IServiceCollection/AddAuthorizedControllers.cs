using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace Api.Extensions;

public static partial class IServiceCollectionExtensions
{
    public static IServiceCollection AddAuthorizedControllers(this IServiceCollection services)
    {
        services.AddControllers(options =>
        {
            var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser().Build();
            options.Filters.Add(new AuthorizeFilter(policy));
        });

        return services;
    }
}