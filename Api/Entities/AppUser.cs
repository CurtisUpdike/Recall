using Microsoft.AspNetCore.Identity;

namespace Api.Entities;

public class AppUser : IdentityUser
{
    public string DeckId { get; set; } = string.Empty;
    public ICollection<Deck> Decks { get; set; } = new List<Deck>();
}
