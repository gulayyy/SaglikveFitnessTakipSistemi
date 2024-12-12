using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class GoalsController : ControllerBase
{
    private readonly AppDbContext _context;

    public GoalsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Goals
    [HttpGet]
    public async Task<IActionResult> GetGoals()
    {
        var goals = await _context.Goals.ToListAsync();
        return Ok(goals);
    }

    // GET: api/Goals/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetGoal(int id)
    {
        var goal = await _context.Goals.FindAsync(id);
        if (goal == null) return NotFound();
        return Ok(goal);
    }

    // POST: api/Goals
    [HttpPost]
    public async Task<IActionResult> CreateGoal(Goal goal)
    {
        _context.Goals.Add(goal);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetGoal), new { id = goal.GoalID }, goal);
    }

    // PUT: api/Goals/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGoal(int id, Goal goal)
    {
        if (id != goal.GoalID) return BadRequest();

        _context.Entry(goal).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Goals/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGoal(int id)
    {
        var goal = await _context.Goals.FindAsync(id);
        if (goal == null) return NotFound();

        _context.Goals.Remove(goal);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
