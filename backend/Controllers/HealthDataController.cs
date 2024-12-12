using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class HealthDataController : ControllerBase
{
    private readonly AppDbContext _context;

    public HealthDataController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/HealthData
    [HttpGet]
    public async Task<IActionResult> GetHealthData()
    {
        var healthData = await _context.HealthDatas.ToListAsync();
        return Ok(healthData);
    }

    // GET: api/HealthData/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetHealthDataItem(int id)
    {
        var healthData = await _context.HealthDatas.FindAsync(id);
        if (healthData == null) return NotFound();
        return Ok(healthData);
    }

    // POST: api/HealthData
    [HttpPost]
    public async Task<IActionResult> CreateHealthData(HealthData healthData)
    {
        _context.HealthDatas.Add(healthData);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetHealthDataItem), new { id = healthData.HealthDataID }, healthData);
    }

    // PUT: api/HealthData/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHealthData(int id, HealthData healthData)
    {
        if (id != healthData.HealthDataID) return BadRequest();

        _context.Entry(healthData).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/HealthData/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHealthData(int id)
    {
        var healthData = await _context.HealthDatas.FindAsync(id);
        if (healthData == null) return NotFound();

        _context.HealthDatas.Remove(healthData);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
