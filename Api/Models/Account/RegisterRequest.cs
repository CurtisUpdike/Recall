using System.ComponentModel.DataAnnotations;

namespace Api.Models.Account;

public class RegisterRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string PasswordConfirmation { get; set; } = string.Empty;
}