using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;
using System.Linq;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MentalHealthTrackingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MentalHealthTrackingController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MentalHealthTrackings
        [HttpGet]
        public async Task<IActionResult> GetMentalHealthTrackings()
        {
            var trackings = await _context.MentalHealthTrackings.ToListAsync();
            return Ok(trackings);
        }

        // GET: api/MentalHealthTrackings/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMentalHealthTracking(int id)
        {
            var tracking = await _context.MentalHealthTrackings
                .FirstOrDefaultAsync(x => x.MentalHealthID == id);

            if (tracking == null)
                return NotFound();

            return Ok(tracking);
        }

        // POST: api/MentalHealthTrackings
        [HttpPost]
        public async Task<IActionResult> CreateMentalHealthTracking([FromBody] MentalHealthTracking tracking)
        {
            if (tracking == null)
                return BadRequest();

            _context.MentalHealthTrackings.Add(tracking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMentalHealthTracking), new { id = tracking.MentalHealthID }, tracking);
        }

        // PUT: api/MentalHealthTrackings/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMentalHealthTracking(int id, [FromBody] MentalHealthTracking tracking)
        {
            if (id != tracking.MentalHealthID)
                return BadRequest();

            var existingTracking = await _context.MentalHealthTrackings
                .FirstOrDefaultAsync(x => x.MentalHealthID == id);

            if (existingTracking == null)
                return NotFound();

            existingTracking.Mood = tracking.Mood;
            existingTracking.Notes = tracking.Notes;
            existingTracking.TrackingDate = tracking.TrackingDate;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/MentalHealthTrackings/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMentalHealthTracking(int id)
        {
            var tracking = await _context.MentalHealthTrackings
                .FirstOrDefaultAsync(x => x.MentalHealthID == id);

            if (tracking == null)
                return NotFound();

            _context.MentalHealthTrackings.Remove(tracking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
