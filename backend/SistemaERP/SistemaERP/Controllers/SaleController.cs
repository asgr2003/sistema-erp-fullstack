using Microsoft.AspNetCore.Mvc;
using SistemaERP.DTOs;
using SistemaERP.Services;
using Microsoft.AspNetCore.Authorization;

namespace SistemaERP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SaleController : ControllerBase
    {
        private readonly SaleService _service;

        public SaleController(SaleService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSaleDto dto)
        {
            try
            {
                var result = await _service.CreateSale(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sales = await _service.GetAll();
            return Ok(sales);
        }
    }
}