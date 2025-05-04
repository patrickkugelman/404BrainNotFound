using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubsController : ControllerBase
    {
        private static List<Club> _clubs = new List<Club>
        {
            new Club
            {
                Id = "1",
                Name = "NOA Club & Restaurant",
                Description = "Upscale club with a great atmosphere and music.",
                Address = "Str. Republicii 109, Cluj-Napoca",
                Latitude = 46.7688,
                Longitude = 23.5994,
                ActiveParty = true,
                Rating = 4.5,
                OpeningHours = "22:00 - 05:00",
                ImageUrl = "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                MusicGenre = "House, Pop, Commercial", // Fixed: Changed List<string> to a single string
                PartyType = "Regular"
            },
            new Club
            {
                Id = "2",
                Name = "Form Space",
                Description = "Popular venue for electronic music events.",
                Address = "Str. Horea 4, Cluj-Napoca",
                Latitude = 46.7710,
                Longitude = 23.5794,
                ActiveParty = true,
                Rating = 4.7,
                OpeningHours = "23:00 - 06:00",
                ImageUrl = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                MusicGenre = "Techno, EDM, Drum and Bass", // Fixed: Changed List<string> to a single string
                PartyType = "EDM"
            }
        };

        public static List<Club> Clubs { get => _clubs; set => _clubs = value; }

        [HttpGet]
        public ActionResult<IEnumerable<Club>> GetClubs()
        {
            return Ok(Clubs);
        }

        [HttpGet("{id}")]
        public ActionResult<Club> GetClub(string id)
        {
            var club = Clubs.FirstOrDefault(c => c.Id == id);
            if (club == null)
                return NotFound();

            return Ok(club);
        }

        [HttpGet("by-genre/{genre}")]
        public ActionResult<IEnumerable<Club>> GetClubsByGenre(string genre)
        {
            var clubs = Clubs.Where(c => c.MusicGenre.Contains(genre, StringComparison.OrdinalIgnoreCase)).ToList(); // Fixed: Adjusted to check if genre is contained in the string
            return Ok(clubs);
        }

        [HttpGet("by-party-type/{partyType}")]
        public ActionResult<IEnumerable<Club>> GetClubsByPartyType(string partyType)
        {
            var clubs = Clubs.Where(c => c.PartyType.Equals(partyType, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(clubs);
        }
    }
}