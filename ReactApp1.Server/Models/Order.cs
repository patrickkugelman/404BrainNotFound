namespace ReactApp1.Server.Models
{
    public class Order
    {
        public string? Id { get; set; }
        public string UserId { get; set; }
        public List<Ticket> Tickets { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? Status { get; set; }
        public string PaymentMethod { get; set; }
    }
}
