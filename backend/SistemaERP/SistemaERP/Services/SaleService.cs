using SistemaERP.Data;
using SistemaERP.DTOs;
using SistemaERP.Models;
using Microsoft.EntityFrameworkCore;

namespace SistemaERP.Services
{
    public class SaleService
    {
        private readonly AppDbContext _context;

        public SaleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Sale> CreateSale(CreateSaleDto dto)
        {
            var sale = new Sale
            {
                CustomerId = dto.CustomerId,
                Date = DateTime.Now,
                Total = 0,
                Details = new List<SaleDetail>()
            };

            foreach (var item in dto.Items)
            {
                var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == item.ProductId);

                if (product == null)
                    throw new Exception($"Producto {item.ProductId} no existe");

                if (product.Stock < item.Quantity)
                    throw new Exception("Stock insuficiente");

                var detail = new SaleDetail
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    Price = product.Price
                };

                sale.Total += product.Price * item.Quantity;

                product.Stock -= item.Quantity;

                sale.Details.Add(detail);
            }

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return sale;
        }
        public async Task<List<Sale>> GetAll()
        {
            return await _context.Sales.ToListAsync();
        }
    }
}