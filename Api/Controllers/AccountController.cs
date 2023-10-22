using Api.Entities;
using Api.Models.Account;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public async Task<ActionResult<Response>> Register(RegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.Username))
            ModelState.AddModelError("username", "Username is required");

        if (await userManager.Users.AnyAsync(u => u.UserName == request.Username))
            ModelState.AddModelError("username", "Username is already taken");

        if (await userManager.Users.AnyAsync(u => u.Email == request.Email))
            ModelState.AddModelError("email", "Email is already taken");

        if (request.Password != request.PasswordConfirmation)
            ModelState.AddModelError("password", "Passwords do not match");

        var user = new AppUser
        {
            Email = request.Email,
            UserName = request.Username
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
            return new Response(request.Username, tokenService.CreateToken(user));
        else
            return BadRequest(result.Errors);
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<Response>> Login(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user is null)
            return Unauthorized();

        var passwordDoesMatch = await userManager.CheckPasswordAsync(user, request.Password);

        if (passwordDoesMatch)
            return new Response(user.UserName!, tokenService.CreateToken(user));
        else
            return Unauthorized();
    }

    [HttpGet]
    public async Task<ActionResult<Response>> GetCurrentUser()
    {
        var user = await userManager.FindByEmailAsync(
            User.FindFirstValue(ClaimTypes.Email)!);

        if (user is null)
            return Unauthorized();
        else
            return new Response(user.UserName!, tokenService.CreateToken(user));
    }
}
