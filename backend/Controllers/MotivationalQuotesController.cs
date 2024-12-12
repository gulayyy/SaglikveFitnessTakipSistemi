using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class MotivationalQuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public MotivationalQuotesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/MotivationalQuotes
    [HttpGet]
    public async Task<IActionResult> GetMotivationalQuotes()
    {
        var motivationalQuotes = await _context.MotivationalQuotes.ToListAsync();
        return Ok(motivationalQuotes);
    }

    // GET: api/MotivationalQuotes/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMotivationalQuote(int id)
    {
        var motivationalQuote = await _context.MotivationalQuotes.FindAsync(id);
        if (motivationalQuote == null) return NotFound();
        return Ok(motivationalQuote);
    }

    // POST: api/MotivationalQuotes
    [HttpPost]
    public async Task<IActionResult> CreateMotivationalQuote(MotivationalQuote motivationalQuote)
    {
        _context.MotivationalQuotes.Add(motivationalQuote);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMotivationalQuote), new { id = motivationalQuote.QuoteID }, motivationalQuote);
    }

    // PUT: api/MotivationalQuotes/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMotivationalQuote(int id, MotivationalQuote motivationalQuote)
    {
        if (id != motivationalQuote.QuoteID) return BadRequest();

        _context.Entry(motivationalQuote).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/MotivationalQuotes/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMotivationalQuote(int id)
    {
        var motivationalQuote = await _context.MotivationalQuotes.FindAsync(id);
        if (motivationalQuote == null) return NotFound();

        _context.MotivationalQuotes.Remove(motivationalQuote);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
