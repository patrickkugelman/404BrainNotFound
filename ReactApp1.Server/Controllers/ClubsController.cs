using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using ReactApp1.Server.Data;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClubsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/clubs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Club>>> GetClubs()
        {
            return Ok(await _context.Clubs.ToListAsync());
        }

        // GET: api/clubs/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Club>> GetClub(string id)
        {
            var club = await _context.Clubs.FindAsync(id);
            if (club == null)
                return NotFound();
            return Ok(club);
        }

        // GET: api/clubs/by-genre/{genre}
        [HttpGet("by-genre/{genre}")]
        public async Task<ActionResult<IEnumerable<Club>>> GetClubsByGenre(string genre)
        {
            var clubs = await _context.Clubs
                .Where(c => c.MusicGenre.Contains(genre))
                .ToListAsync();
            return Ok(clubs);
        }

        // GET: api/clubs/by-party-type/{partyType}
        [HttpGet("by-party-type/{partyType}")]
        public async Task<ActionResult<IEnumerable<Club>>> GetClubsByPartyType(string partyType)
        {
            var clubs = await _context.Clubs
                .Where(c => c.PartyType.Equals(partyType, StringComparison.OrdinalIgnoreCase))
                .ToListAsync();
            return Ok(clubs);
        }

        // POST: api/clubs
        [HttpPost]
        public async Task<ActionResult<Club>> CreateClub([FromBody] Club club)
        {
            club.Id = Guid.NewGuid().ToString();
            _context.Clubs.Add(club);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetClub), new { id = club.Id }, club);
        }

        // PUT: api/clubs/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClub(string id, [FromBody] Club club)
        {
            if (id != club.Id)
                return BadRequest();

            var existingClub = await _context.Clubs.FindAsync(id);
            if (existingClub == null)
                return NotFound();

            // Update properties
            existingClub.Name = club.Name;
            existingClub.Address = club.Address;
            existingClub.Latitude = club.Latitude;
            existingClub.Longitude = club.Longitude;
            existingClub.MusicGenre = club.MusicGenre;
            existingClub.PartyType = club.PartyType;
            existingClub.Description = club.Description;
            existingClub.ImageUrl = club.ImageUrl;
            existingClub.Rating = club.Rating;
            existingClub.OpeningHours = club.OpeningHours;
            existingClub.ActiveParty = club.ActiveParty;
            existingClub.IsFavorite = club.IsFavorite;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/clubs/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClub(string id)
        {
            var club = await _context.Clubs.FindAsync(id);
            if (club == null)
                return NotFound();

            _context.Clubs.Remove(club);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}