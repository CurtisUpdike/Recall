namespace Api.Entities;

public class Deck
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string OwnerId { get; set; } = string.Empty;
    public AppUser Owner { get; set; } = null!;
    public ICollection<Card> Cards { get; set;} = new List<Card>();
}
