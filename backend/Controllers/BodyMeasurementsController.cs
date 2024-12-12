using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class BodyMeasurementsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BodyMeasurementsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/BodyMeasurements
    [HttpGet]
    public async Task<IActionResult> GetBodyMeasurements()
    {
        var bodyMeasurements = await _context.BodyMeasurements.ToListAsync();
        return Ok(bodyMeasurements);
    }

    // GET: api/BodyMeasurements/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBodyMeasurement(int id)
    {
        var bodyMeasurement = await _context.BodyMeasurements.FindAsync(id);
        if (bodyMeasurement == null) return NotFound();
        return Ok(bodyMeasurement);
    }

    // POST: api/BodyMeasurements
    [HttpPost]
    public async Task<IActionResult> CreateBodyMeasurement(BodyMeasurement bodyMeasurement)
    {
        _context.BodyMeasurements.Add(bodyMeasurement);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBodyMeasurement), new { id = bodyMeasurement.MeasurementID }, bodyMeasurement);
    }

    // PUT: api/BodyMeasurements/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBodyMeasurement(int id, BodyMeasurement bodyMeasurement)
    {
        if (id != bodyMeasurement.MeasurementID) return BadRequest();

        _context.Entry(bodyMeasurement).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/BodyMeasurements/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBodyMeasurement(int id)
    {
        var bodyMeasurement = await _context.BodyMeasurements.FindAsync(id);
        if (bodyMeasurement == null) return NotFound();

        _context.BodyMeasurements.Remove(bodyMeasurement);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
