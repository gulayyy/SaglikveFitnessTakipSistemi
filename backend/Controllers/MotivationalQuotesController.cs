using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MotivationalQuoteController : ControllerBase
    {
        private readonly MotivationalQuoteService _service;

        public MotivationalQuoteController(MotivationalQuoteService service)
        {
            _service = service;
        }

        // GET: api/MotivationalQuote
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MotivationalQuote>>> GetAllQuotes()
        {
            return Ok(await _service.GetAllQuotesAsync());
        }

        // GET: api/MotivationalQuote/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MotivationalQuote>> GetQuote(int id)
        {
            var quote = await _service.GetQuoteByIdAsync(id);
            if (quote == null)
            {
                return NotFound();
            }
            return Ok(quote);
        }

        // POST: api/MotivationalQuote
        [HttpPost]
        public async Task<ActionResult<MotivationalQuote>> CreateQuote(MotivationalQuote quote)
        {
            var createdQuote = await _service.CreateQuoteAsync(quote);
            return CreatedAtAction(nameof(GetQuote), new { id = createdQuote.QuoteID }, createdQuote);
        }

        // PUT: api/MotivationalQuote/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuote(int id, MotivationalQuote quote)
        {
            if (id != quote.QuoteID)
            {
                return BadRequest();
            }

            await _service.UpdateQuoteAsync(quote);
            return NoContent();
        }

        // DELETE: api/MotivationalQuote/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            await _service.DeleteQuoteAsync(id);
            return NoContent();
        }
    }
}
