using Api.Entities;
using Api.Models.Account;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> userManager;
    private readonly TokenService tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        this.userManager = userManager;
        this.tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserCredentials>> Register(RegisterRequest request)
    {
        var user = new AppUser 
        {
            Email = request.Email,
            UserName = request.Username
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.Code, error.Description);

        return ModelState.IsValid
            ? new UserCredentials(request.Username, tokenService.CreateToken(user))
            : ValidationProblem();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserCredentials>> Login(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user is null)
            return Unauthorized();

        var isValidPassword = await userManager.CheckPasswordAsync(user, request.Password);

        return isValidPassword
            ? new UserCredentials(user.UserName!, tokenService.CreateToken(user))
            : Unauthorized();
    }

    [HttpGet]
    public async Task<ActionResult<UserCredentials>> GetCurrentUser()
    {
        var user = await userManager.FindByEmailAsync(
            User.FindFirstValue(ClaimTypes.Email)!);

        return user is not null
            ? new UserCredentials(user.UserName!, tokenService.CreateToken(user))
            : Unauthorized();
    }
}
