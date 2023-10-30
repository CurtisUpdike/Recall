using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Entities;
using Api.Extensions;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CardsController : ControllerBase
{
    private readonly DataContext context;

    public CardsController(DataContext context)
    {
        this.context = context;
    }

    public record CardResponse(string Id, string Front, string Back, string DeckId);
    public record CardRequest(string Front, string Back, string DeckId);

    // GET: api/cards
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CardResponse>>> GetCards()
    {
        return await context.Cards
            .Where(c => c.OwnerId == User.GetId())
            .Select(c => new CardResponse(c.Id, c.Front, c.Back, c.DeckId))
            .ToListAsync();
    }

    // GET: api/cards/5
    [HttpGet("{id}")]
    public async Task<ActionResult<CardResponse>> GetCard(string id)
    {
        var card = await context.Cards.FindAsync(id);

        if (card == null)
            return NotFound();

        if (card.OwnerId == User.GetId())
            return Unauthorized();

        return new CardResponse(card.Id, card.Front, card.Back, card.DeckId);
    }

    // POST: api/cards
    [HttpPost]
    public async Task<IActionResult> CreateCard(CardRequest card)
    {
        var deck = await context.Decks.FindAsync(card.DeckId);

        if (deck is null)
            return BadRequest();

        if (deck.OwnerId != User.GetId())
            return Forbid();

        context.Add(new Card
        {
            Front = card.Front,
            Back = card.Back,
            DeckId = card.DeckId,
            OwnerId = User.GetId(),
        });

        await context.SaveChangesAsync();
        return Ok();
    }

    // PUT: api/cards/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCard(string id, CardRequest updatedCard)
    {
        var deck = await context.Decks.FindAsync(updatedCard.DeckId);

        if (deck is null)
            return BadRequest();

        var card = await context.Cards.FindAsync(id);

        if (card == null)
            return NotFound();

        if (card.OwnerId != User.GetId())
            return Forbid();

        card.Front = updatedCard.Front;
        card.Back = updatedCard.Back;
        card.DeckId = updatedCard.DeckId;
        await context.SaveChangesAsync();
        return Ok();

    }

    // DELETE: api/cards/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCard(string id)
    {
        var card = await context.Cards.FindAsync(id);

        if (card == null)
            return NotFound();

        if (card.OwnerId != User.GetId())
            return Forbid();

        context.Cards.Remove(card);
        await context.SaveChangesAsync();
        return Ok();
    }
}
