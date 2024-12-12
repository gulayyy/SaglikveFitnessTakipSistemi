using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SleepTrackingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SleepTrackingController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/SleepTracking
        [HttpGet]
        public async Task<IActionResult> GetSleepTrackings()
        {
            var sleepTrackings = await _context.SleepTrackings.ToListAsync();
            return Ok(sleepTrackings);
        }

        // GET: api/SleepTracking/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSleepTracking(int id)
        {
            var sleepTracking = await _context.SleepTrackings.FindAsync(id);
            if (sleepTracking == null)
                return NotFound();

            return Ok(sleepTracking);
        }

        // POST: api/SleepTracking
        [HttpPost]
        public async Task<IActionResult> CreateSleepTracking(SleepTracking sleepTracking)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.SleepTrackings.Add(sleepTracking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSleepTracking), new { id = sleepTracking.SleepID }, sleepTracking);
        }

        // PUT: api/SleepTracking/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSleepTracking(int id, SleepTracking sleepTracking)
        {
            if (id != sleepTracking.SleepID)
                return BadRequest();

            _context.Entry(sleepTracking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SleepTrackingExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/SleepTracking/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSleepTracking(int id)
        {
            var sleepTracking = await _context.SleepTrackings.FindAsync(id);
            if (sleepTracking == null)
                return NotFound();

            _context.SleepTrackings.Remove(sleepTracking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SleepTrackingExists(int id)
        {
            return _context.SleepTrackings.Any(e => e.SleepID == id);
        }
    }
}
