namespace Api.Entities;

public class Card
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Front { get; set; } = string.Empty;
    public string Back {  get; set; } = string.Empty;
    public string DeckId { get; set; } = string.Empty;
    public Deck Deck { get; set; } = null!;
    public string OwnerId {  get; set; } = string.Empty;
    public AppUser Owner { get; set; } = null!;
}
