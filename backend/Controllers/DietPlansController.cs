using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class DietPlansController : ControllerBase
{
    private readonly AppDbContext _context;

    public DietPlansController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/DietPlans
    [HttpGet]
    public async Task<IActionResult> GetDietPlans()
    {
        var dietPlans = await _context.DietPlans.ToListAsync();
        return Ok(dietPlans);
    }

    // GET: api/DietPlans/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDietPlan(int id)
    {
        var dietPlan = await _context.DietPlans.FindAsync(id);
        if (dietPlan == null) return NotFound();
        return Ok(dietPlan);
    }

    // POST: api/DietPlans
    [HttpPost]
    public async Task<IActionResult> CreateDietPlan(DietPlan dietPlan)
    {
        _context.DietPlans.Add(dietPlan);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDietPlan), new { id = dietPlan.DietPlanID }, dietPlan);
    }

    // PUT: api/DietPlans/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDietPlan(int id, DietPlan dietPlan)
    {
        if (id != dietPlan.DietPlanID) return BadRequest();

        _context.Entry(dietPlan).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/DietPlans/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDietPlan(int id)
    {
        var dietPlan = await _context.DietPlans.FindAsync(id);
        if (dietPlan == null) return NotFound();

        _context.DietPlans.Remove(dietPlan);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
