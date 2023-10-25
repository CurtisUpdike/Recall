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
    public record CreateDeckRequest(string Name);
    public record UpdateDeckRequest(string Id, string Name);

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
            return Unauthorized();

        return new DeckResponse(deck.Id, deck.Name);
    }

    // POST: api/decks
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Deck>> CreateDeck(CreateDeckRequest deck)
    {
        var newDeck = new Deck
        {
            Name = deck.Name,
            OwnerId = User.GetId()
        };

        context.Decks.Add(newDeck);
        await context.SaveChangesAsync();
        return Ok();
    }

    // PUT: api/decks/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDesk(string id, UpdateDeckRequest updatedDeck)
    {
        if (id != updatedDeck.Id)
            return BadRequest();

        var deck = await context.Decks.FindAsync(id);

        if (deck == null) 
            return NotFound();

        if (deck.OwnerId != User.GetId())
            return Unauthorized();

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
            return BadRequest();

        context.Decks.Remove(deck);
        await context.SaveChangesAsync();
        return Ok();
    }
}
