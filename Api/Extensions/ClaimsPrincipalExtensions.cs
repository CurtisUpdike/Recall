using System.Security.Claims;

namespace Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetId(this ClaimsPrincipal principal) =>
        principal?.FindFirstValue(ClaimTypes.NameIdentifier) 
            ?? throw new ArgumentNullException(nameof(principal));
}
