using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Entities;
using Api.Extensions;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DecksController : ControllerBase
{
    private readonly DataContext context;

    public DecksController(DataContext context)
    {
        this.context = context;
    }

    public record DeckResponse(string Id, string Name);
    public record DeckRequest(string Name);
    public record CardResponse(string Id, string Front, string Back);

    // GET: api/decks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DeckResponse>>> GetDecks()
    {
        return await context.Decks
            .Where(d => d.OwnerId == User.GetId())
            .Select(d => new DeckResponse(d.Id, d.Name))
            .ToListAsync();
    }

    // GET: api/decks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DeckResponse>> GetDeck(string id)
    {
        var deck = await context.Decks.FindAsync(id);

        if (deck == null)
            return NotFound();

        if (deck.OwnerId != User.GetId())
            return Forbid();

        return new DeckResponse(deck.Id, deck.Name);
    }

    // POST: api/decks
    [HttpPost]
    public async Task<ActionResult<DeckResponse>> CreateDeck(DeckRequest deck)
    {
        var newDeck = new Deck
        {
            Name = deck.Name,
            OwnerId = User.GetId()
        };

        context.Decks.Add(newDeck);

        await context.SaveChangesAsync();
        return new DeckResponse(newDeck.Id, newDeck.Name);
    }

    // PUT: api/decks/5
    [HttpPut("{id}")]
    public async Task<ActionResult<DeckResponse>> UpdateDesk(string id, DeckRequest updatedDeck)
    {
        var deck = await context.Decks.FindAsync(id);

        if (deck == null) 
            return NotFound();

        if (deck.OwnerId != User.GetId())
            return Forbid();

        deck.Name = updatedDeck.Name;
        await context.SaveChangesAsync();
        return Ok();
    }

    // DELETE: api/decks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDeck(string id)
    {
        var deck = await context.Decks.FindAsync(id);
        
        if (deck == null)
            return NotFound();

        if (deck.OwnerId != User.GetId())
            return Forbid();

        context.Decks.Remove(deck);
        await context.SaveChangesAsync();
        return Ok();
    }

    // GET: api/decks/5/cards
    [HttpGet("{id}/cards")]
    public async Task<ActionResult<IEnumerable<CardResponse>>> GetDeckCards(string id)
    {
        var deck = await context.Decks.FindAsync(id);
        
        if (deck is null)
            return NotFound();

        if (deck.OwnerId != User.GetId())
            return Forbid();

        return await context.Cards
            .Where(c => c.DeckId == id)
            .Select(c => new CardResponse(c.Id, c.Front, c.Back))
            .ToListAsync();
    }
}
