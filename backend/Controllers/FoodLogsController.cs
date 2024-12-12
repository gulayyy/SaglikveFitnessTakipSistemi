using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class FoodLogsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FoodLogsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/FoodLogs
    [HttpGet]
    public async Task<IActionResult> GetFoodLogs()
    {
        var foodLogs = await _context.FoodLogs.ToListAsync();
        return Ok(foodLogs);
    }

    // GET: api/FoodLogs/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetFoodLog(int id)
    {
        var foodLog = await _context.FoodLogs.FindAsync(id);
        if (foodLog == null) return NotFound();
        return Ok(foodLog);
    }

    // POST: api/FoodLogs
    [HttpPost]
    public async Task<IActionResult> CreateFoodLog(FoodLog foodLog)
    {
        _context.FoodLogs.Add(foodLog);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetFoodLog), new { id = foodLog.LogID }, foodLog);
    }

    // PUT: api/FoodLogs/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateFoodLog(int id, FoodLog foodLog)
    {
        if (id != foodLog.LogID) return BadRequest();

        _context.Entry(foodLog).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/FoodLogs/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFoodLog(int id)
    {
        var foodLog = await _context.FoodLogs.FindAsync(id);
        if (foodLog == null) return NotFound();

        _context.FoodLogs.Remove(foodLog);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
