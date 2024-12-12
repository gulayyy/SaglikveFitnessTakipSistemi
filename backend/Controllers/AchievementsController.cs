using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class AchievementsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AchievementsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Achievements
    [HttpGet]
    public async Task<IActionResult> GetAchievements()
    {
        var achievements = await _context.Achievements.ToListAsync();
        return Ok(achievements);
    }

    // GET: api/Achievements/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAchievement(int id)
    {
        var achievement = await _context.Achievements.FindAsync(id);
        if (achievement == null) return NotFound();
        return Ok(achievement);
    }

    // POST: api/Achievements
    [HttpPost]
    public async Task<IActionResult> CreateAchievement(Achievement achievement)
    {
        _context.Achievements.Add(achievement);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAchievement), new { id = achievement.AchievementID }, achievement);
    }

    // PUT: api/Achievements/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAchievement(int id, Achievement achievement)
    {
        if (id != achievement.AchievementID) return BadRequest();

        _context.Entry(achievement).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Achievements/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAchievement(int id)
    {
        var achievement = await _context.Achievements.FindAsync(id);
        if (achievement == null) return NotFound();

        _context.Achievements.Remove(achievement);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
