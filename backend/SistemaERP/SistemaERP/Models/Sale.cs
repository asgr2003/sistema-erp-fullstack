namespace SistemaERP.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Total { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;

        public List<SaleDetail> Details { get; set; } = new();
    }
}