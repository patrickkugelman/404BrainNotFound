public class Club
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Address { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string MusicGenre { get; set; }
    public string PartyType { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }

    // schimbăm Rating din string în double:
    public double Rating { get; set; }

    // schimbăm OpeningHours din double în string:
    public string OpeningHours { get; set; }

    // schimbăm ActiveParty din string în bool:
    public bool ActiveParty { get; set; }

    public bool IsFavorite { get; set; }
}
