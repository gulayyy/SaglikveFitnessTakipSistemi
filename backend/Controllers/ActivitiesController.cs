using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ActivitiesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Activities
    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        var activities = await _context.Activities.ToListAsync();
        return Ok(activities);
    }

    // GET: api/Activities/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(int id)
    {
        var activity = await _context.Activities.FindAsync(id);
        if (activity == null) return NotFound();
        return Ok(activity);
    }

    // POST: api/Activities
    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        _context.Activities.Add(activity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetActivity), new { id = activity.ActivityID }, activity);
    }

    // PUT: api/Activities/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(int id, Activity activity)
    {
        if (id != activity.ActivityID) return BadRequest();

        _context.Entry(activity).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Activities/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(int id)
    {
        var activity = await _context.Activities.FindAsync(id);
        if (activity == null) return NotFound();

        _context.Activities.Remove(activity);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
