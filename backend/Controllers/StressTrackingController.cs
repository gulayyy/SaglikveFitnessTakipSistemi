using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StressTrackingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StressTrackingController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/StressTracking
        [HttpGet]
        public async Task<IActionResult> GetStressTrackings()
        {
            var stressTrackings = await _context.StressTrackings.ToListAsync(); // Correct DbSet name
            return Ok(stressTrackings);
        }

        // GET: api/StressTracking/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStressTracking(int id)
        {
            var stressTracking = await _context.StressTrackings.FindAsync(id); // Correct DbSet name
            if (stressTracking == null)
                return NotFound();

            return Ok(stressTracking);
        }

        // POST: api/StressTracking
        [HttpPost]
        public async Task<IActionResult> CreateStressTracking(StressTracking stressTracking)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.StressTrackings.Add(stressTracking); // Correct DbSet name
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStressTracking), new { id = stressTracking.StressID }, stressTracking);
        }

        // PUT: api/StressTracking/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStressTracking(int id, StressTracking stressTracking)
        {
            if (id != stressTracking.StressID)
                return BadRequest();

            _context.Entry(stressTracking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StressTrackingExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/StressTracking/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStressTracking(int id)
        {
            var stressTracking = await _context.StressTrackings.FindAsync(id); // Correct DbSet name
            if (stressTracking == null)
                return NotFound();

            _context.StressTrackings.Remove(stressTracking); // Correct DbSet name
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StressTrackingExists(int id)
        {
            return _context.StressTrackings.Any(e => e.StressID == id); // Correct DbSet name
        }
    }
}
