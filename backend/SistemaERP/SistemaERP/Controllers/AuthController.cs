using Microsoft.AspNetCore.Mvc;
using SistemaERP.Models;
using SistemaERP.Services;

namespace SistemaERP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _service;

        public AuthController(AuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            return Ok(_service.Register(user));
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var token = _service.Login(user.Username, user.Password);

            if (token == null)
                return Unauthorized();

            return Ok(new { token = token }); // 👈 IMPORTANTE
        }
    }
}