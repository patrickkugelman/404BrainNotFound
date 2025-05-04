namespace ReactApp1.Server.Models
{
    public class Ticket
    {
        public string? Id { get; set; }
        public string ClubId { get; set; }
        public string UserId { get; set; }
        public string? OrderId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public string? Status { get; set; }
    }
}
