namespace SistemaERP.DTOs
{
    public class CreateSaleDto
    {
        public int CustomerId { get; set; }
        public required List<SaleItemDto> Items { get; set; }
    }

    public class SaleItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}