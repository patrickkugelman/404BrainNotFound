using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private static List<CartItem> _cartItems = new List<CartItem>();

        [HttpGet("{userId}")]
        public ActionResult<IEnumerable<CartItem>> GetUserCart(string userId)
        {
            var userCart = _cartItems.Where(c => c.UserId == userId).ToList();
            return Ok(userCart);
        }

        [HttpPost]
        public ActionResult<CartItem> AddToCart([FromBody] CartItem cartItem)
        {
            cartItem.Id = Guid.NewGuid().ToString();
            cartItem.DateAdded = DateTime.UtcNow;
            _cartItems.Add(cartItem);
            return CreatedAtAction(nameof(GetUserCart), new { userId = cartItem.UserId }, cartItem);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveFromCart(string id)
        {
            var cartItem = _cartItems.FirstOrDefault(c => c.Id == id);
            if (cartItem == null)
                return NotFound();

            _cartItems.Remove(cartItem);
            return NoContent();
        }
    }
}
