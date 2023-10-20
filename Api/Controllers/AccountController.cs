using Api.Entities;
using Api.Models.Account;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api")]
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
        if (string.IsNullOrEmpty(request.UserName))
            ModelState.AddModelError("username", "Username is required");

        if (await userManager.Users.AnyAsync(u => u.UserName == request.UserName))
            ModelState.AddModelError("username", "Username is taken");

        if (await userManager.Users.AnyAsync(u => u.Email == request.Email))
            ModelState.AddModelError("email", "Email is take");

        if (request.Password != request.PasswordConfirmation)
            ModelState.AddModelError("password", "Passwords do not match");

        if (!ModelState.IsValid)
            return ValidationProblem();

        var user = new AppUser
        {
            Email = request.Email,
            UserName = request.UserName
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
            return new Response
            {
                UserName = request.UserName,
                Token = tokenService.CreateToken(user)
            };
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
            return new Response
            {
                UserName = user.UserName!,
                Token = tokenService.CreateToken(user)
            };
        else
            return Unauthorized();
    }
}
