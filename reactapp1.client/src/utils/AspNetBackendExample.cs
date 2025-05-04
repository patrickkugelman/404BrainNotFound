using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ClubApp.Models
{
    // Club model matching your React app's data structure
    public class Club
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool ActiveParty { get; set; }
        public double Rating { get; set; }
        public string OpeningHours { get; set; }
        public string Image { get; set; }
        public string[] MusicGenres { get; set; }
        public string PartyType { get; set; }
    }

    // New models for cart and ticket functionality
    public class CartItem
    {
        public string Id { get; set; }
        public string ClubId { get; set; }
        public string UserId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime DateAdded { get; set; }
    }

    public class Ticket
    {
        public string Id { get; set; }
        public string ClubId { get; set; }
        public string UserId { get; set; }
        public string OrderId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Status { get; set; } // "Valid", "Used", "Expired", etc.
    }

    public class Order
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public List<Ticket> Tickets { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } // "Pending", "Completed", "Cancelled"
        public string PaymentMethod { get; set; }
    }
}

namespace ClubApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubsController : ControllerBase
    {
        private static readonly List<Club> _clubs = new List<Club>
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
                Image = "/images/club1.jpg",
                MusicGenres = new[] { "House", "Pop", "Commercial" },
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
                Image = "/images/club2.jpg",
                MusicGenres = new[] { "Techno", "EDM", "Drum and Bass" },
                PartyType = "EDM"
            },
            new Club
            {
                Id = "3",
                Name = "Phi18",
                Description = "Trendy rooftop club with amazing views of the city.",
                Address = "Str. Piezisa 18, Cluj-Napoca",
                Latitude = 46.7639,
                Longitude = 23.5625,
                ActiveParty = true,
                Rating = 4.3,
                OpeningHours = "21:00 - 04:00",
                Image = "/images/club3.jpg",
                MusicGenres = new[] { "R&B", "Hip Hop", "Reggaeton" },
                PartyType = "Themed"
            },
            new Club
            {
                Id = "8",
                Name = "Euphoria Lounge",
                Description = "Modern club with stunning panoramic views of Cluj.",
                Address = "Str. Piezisa 2, Cluj-Napoca",
                Latitude = 46.7642,
                Longitude = 23.5618,
                ActiveParty = true,
                Rating = 4.6,
                OpeningHours = "22:00 - 06:00",
                Image = "/images/club8.jpg",
                MusicGenres = new[] { "House", "Electronic", "Pop" },
                PartyType = "Regular"
            },
            new Club
            {
                Id = "9",
                Name = "Piezisa Social Club",
                Description = "Trendy bar and club with open terrace and great cocktails.",
                Address = "Str. Piezisa 10, Cluj-Napoca",
                Latitude = 46.7637,
                Longitude = 23.5621,
                ActiveParty = true,
                Rating = 4.4,
                OpeningHours = "20:00 - 04:00",
                Image = "/images/club9.jpg",
                MusicGenres = new[] { "Funk", "Soul", "Disco" },
                PartyType = "Regular"
            },
            new Club
            {
                Id = "10",
                Name = "Skyline Club",
                Description = "Exclusive rooftop club with premium service and amazing views.",
                Address = "Str. Piezisa 14, Cluj-Napoca",
                Latitude = 46.7635,
                Longitude = 23.5628,
                ActiveParty = false,
                Rating = 4.9,
                OpeningHours = "21:00 - 05:00",
                Image = "/images/club10.jpg",
                MusicGenres = new[] { "Deep House", "Lounge", "Ambient" },
                PartyType = "Themed"
            },
            new Club
            {
                Id = "11",
                Name = "Vertigo Bar",
                Description = "High-energy club popular with students and young professionals.",
                Address = "Str. Piezisa 20, Cluj-Napoca",
                Latitude = 46.7631,
                Longitude = 23.5632,
                ActiveParty = true,
                Rating = 4.2,
                OpeningHours = "22:30 - 05:30",
                Image = "/images/club11.jpg",
                MusicGenres = new[] { "Hip Hop", "Trap", "R&B" },
                PartyType = "Students"
            },
            // More clubs would be added here, typically from a database
        };

        // GET: api/clubs
        [HttpGet]
        public ActionResult<IEnumerable<Club>> GetAll()
        {
            return _clubs;
        }

        // GET: api/clubs/5
        [HttpGet("{id}")]
        public ActionResult<Club> GetById(string id)
        {
            var club = _clubs.FirstOrDefault(c => c.Id == id);
            
            if (club == null)
            {
                return NotFound();
            }
            
            return club;
        }

        // GET: api/clubs/featured
        [HttpGet("featured")]
        public ActionResult<IEnumerable<Club>> GetFeatured()
        {
            var featuredClubs = _clubs.Where(c => c.Rating >= 4.5).ToList();
            return featuredClubs;
        }

        // GET: api/clubs/category/{partyType}
        [HttpGet("category/{partyType}")]
        public ActionResult<IEnumerable<Club>> GetByPartyType(string partyType)
        {
            var categoryClubs = _clubs.Where(c => c.PartyType.Equals(partyType, StringComparison.OrdinalIgnoreCase)).ToList();
            return categoryClubs;
        }
        
        // GET: api/clubs/active
        [HttpGet("active")]
        public ActionResult<IEnumerable<Club>> GetActiveParties()
        {
            var activeClubs = _clubs.Where(c => c.ActiveParty).ToList();
            return activeClubs;
        }

        // GET: api/clubs/search/{query}
        [HttpGet("search/{query}")]
        public ActionResult<IEnumerable<Club>> Search(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return _clubs;

            var normalizedQuery = query.ToLower();
            
            var results = _clubs.Where(c => 
                c.Name.ToLower().Contains(normalizedQuery) ||
                c.Description.ToLower().Contains(normalizedQuery) ||
                c.Address.ToLower().Contains(normalizedQuery) ||
                c.MusicGenres.Any(genre => genre.ToLower().Contains(normalizedQuery)) ||
                c.PartyType.ToLower().Contains(normalizedQuery)
            ).ToList();
            
            return results;
        }
        
        // POST: api/clubs
        [HttpPost]
        public ActionResult<Club> Create(Club club)
        {
            club.Id = (_clubs.Count + 1).ToString();
            _clubs.Add(club);
            
            return CreatedAtAction(nameof(GetById), new { id = club.Id }, club);
        }

        // PUT: api/clubs/5
        [HttpPut("{id}")]
        public IActionResult Update(string id, Club club)
        {
            var existingClub = _clubs.FirstOrDefault(c => c.Id == id);
            
            if (existingClub == null)
            {
                return NotFound();
            }
            
            // In a real application, you would update the database
            // Here we're just updating our in-memory list
            var index = _clubs.IndexOf(existingClub);
            club.Id = id; // Ensure ID stays the same
            _clubs[index] = club;
            
            return NoContent();
        }

        // DELETE: api/clubs/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var club = _clubs.FirstOrDefault(c => c.Id == id);
            
            if (club == null)
            {
                return NotFound();
            }
            
            _clubs.Remove(club);
            
            return NoContent();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        // In-memory storage for cart items (in a real app, this would be in a database)
        private static readonly List<ClubApp.Models.CartItem> _cartItems = new List<ClubApp.Models.CartItem>();

        // GET: api/cart/{userId}
        [HttpGet("{userId}")]
        public ActionResult<IEnumerable<ClubApp.Models.CartItem>> GetUserCart(string userId)
        {
            var userItems = _cartItems.Where(ci => ci.UserId == userId).ToList();
            return userItems;
        }

        // POST: api/cart
        [HttpPost]
        public ActionResult<ClubApp.Models.CartItem> AddToCart(ClubApp.Models.CartItem cartItem)
        {
            // Check if the item is already in the cart
            var existingItem = _cartItems.FirstOrDefault(
                ci => ci.UserId == cartItem.UserId && ci.ClubId == cartItem.ClubId);
            
            if (existingItem != null)
            {
                // Update quantity of existing item
                existingItem.Quantity += cartItem.Quantity;
                return Ok(existingItem);
            }
            
            // Add new item
            cartItem.Id = Guid.NewGuid().ToString();
            cartItem.DateAdded = DateTime.UtcNow;
            _cartItems.Add(cartItem);
            
            return CreatedAtAction(nameof(GetUserCart), new { userId = cartItem.UserId }, cartItem);
        }

        // PUT: api/cart/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCartItem(string id, ClubApp.Models.CartItem cartItem)
        {
            var existingItem = _cartItems.FirstOrDefault(ci => ci.Id == id);
            
            if (existingItem == null)
            {
                return NotFound();
            }
            
            // Update item
            existingItem.Quantity = cartItem.Quantity;
            
            return NoContent();
        }

        // DELETE: api/cart/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCartItem(string id)
        {
            var item = _cartItems.FirstOrDefault(ci => ci.Id == id);
            
            if (item == null)
            {
                return NotFound();
            }
            
            _cartItems.Remove(item);
            
            return NoContent();
        }

        // DELETE: api/cart/user/{userId}
        [HttpDelete("user/{userId}")]
        public IActionResult ClearUserCart(string userId)
        {
            var userItems = _cartItems.Where(ci => ci.UserId == userId).ToList();
            
            foreach (var item in userItems)
            {
                _cartItems.Remove(item);
            }
            
            return NoContent();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private static readonly List<ClubApp.Models.Order> _orders = new List<ClubApp.Models.Order>();
        private static readonly List<ClubApp.Models.Ticket> _tickets = new List<ClubApp.Models.Ticket>();

        // GET: api/orders/{userId}
        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<ClubApp.Models.Order>> GetUserOrders(string userId)
        {
            var userOrders = _orders.Where(o => o.UserId == userId).ToList();
            return userOrders;
        }

        // GET: api/orders/{id}
        [HttpGet("{id}")]
        public ActionResult<ClubApp.Models.Order> GetOrderById(string id)
        {
            var order = _orders.FirstOrDefault(o => o.Id == id);
            
            if (order == null)
            {
                return NotFound();
            }
            
            return order;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<ClubApp.Models.Order>> CreateOrder([FromServices] CartController cartController, ClubApp.Models.Order order)
        {
            // Generate order ID
            order.Id = Guid.NewGuid().ToString();
            order.OrderDate = DateTime.UtcNow;
            order.Status = "Completed"; // In a real app, this might be "Pending" until payment is processed
            
            // Create tickets for each cart item
            var ticketsList = new List<ClubApp.Models.Ticket>();
            foreach (var ticket in order.Tickets)
            {
                ticket.Id = Guid.NewGuid().ToString();
                ticket.OrderId = order.Id;
                ticket.PurchaseDate = DateTime.UtcNow;
                ticket.Status = "Valid";
                
                _tickets.Add(ticket);
                ticketsList.Add(ticket);
            }
            
            order.Tickets = ticketsList;
            _orders.Add(order);
            
            // Clear the user's cart after successful order
            await cartController.ClearUserCart(order.UserId);
            
            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }

        // GET: api/orders/tickets/{userId}
        [HttpGet("tickets/{userId}")]
        public ActionResult<IEnumerable<ClubApp.Models.Ticket>> GetUserTickets(string userId)
        {
            var userTickets = _tickets.Where(t => t.UserId == userId).ToList();
            return userTickets;
        }

        // GET: api/orders/ticket/{id}
        [HttpGet("ticket/{id}")]
        public ActionResult<ClubApp.Models.Ticket> GetTicketById(string id)
        {
            var ticket = _tickets.FirstOrDefault(t => t.Id == id);
            
            if (ticket == null)
            {
                return NotFound();
            }
            
            return ticket;
        }
        
        // PUT: api/orders/ticket/{id}
        [HttpPut("ticket/{id}")]
        public IActionResult UpdateTicketStatus(string id, [FromBody] string status)
        {
            var ticket = _tickets.FirstOrDefault(t => t.Id == id);
            
            if (ticket == null)
            {
                return NotFound();
            }
            
            ticket.Status = status;
            
            return NoContent();
        }
    }
}
