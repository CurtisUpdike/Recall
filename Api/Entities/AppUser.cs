using Microsoft.AspNetCore.Identity;

namespace Api.Entities;

public class AppUser : IdentityUser
{
    public ICollection<Deck> Decks { get; set; } = new List<Deck>();
    public ICollection<Card> Cards { get; set;} = new List<Card>();
}
