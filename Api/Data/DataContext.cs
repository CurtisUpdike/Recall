using Api.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class DataContext : IdentityDbContext<AppUser>
{
    public DbSet<Deck> Decks { get; set; }
    public DbSet<Card> Cards { get; set; }

    public DataContext(DbContextOptions options) : base(options) { }
}
