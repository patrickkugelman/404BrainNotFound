namespace ReactApp1.Server.Models
{
    public class CartItem
    {
        public string? Id { get; set; }
        public string ClubId { get; set; }
        public string UserId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}
