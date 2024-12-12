using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterTrackingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WaterTrackingController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/WaterTrackings
        [HttpGet]
        public async Task<IActionResult> GetWaterTrackings()
        {
            var waterTrackings = await _context.WaterTrackings.ToListAsync();
            return Ok(waterTrackings);
        }

        // GET: api/WaterTrackings/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWaterTracking(int id)
        {
            var waterTracking = await _context.WaterTrackings
                .FirstOrDefaultAsync(x => x.WaterID == id);

            if (waterTracking == null)
                return NotFound();

            return Ok(waterTracking);
        }

        // POST: api/WaterTrackings
        [HttpPost]
        public async Task<IActionResult> CreateWaterTracking([FromBody] WaterTracking waterTracking)
        {
            if (waterTracking == null)
                return BadRequest();

            _context.WaterTrackings.Add(waterTracking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWaterTracking), new { id = waterTracking.WaterID }, waterTracking);
        }

        // PUT: api/WaterTrackings/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWaterTracking(int id, [FromBody] WaterTracking waterTracking)
        {
            if (id != waterTracking.WaterID)
                return BadRequest();

            var existingWaterTracking = await _context.WaterTrackings
                .FirstOrDefaultAsync(x => x.WaterID == id);

            if (existingWaterTracking == null)
                return NotFound();

            existingWaterTracking.WaterAmountInLiters = waterTracking.WaterAmountInLiters;
            existingWaterTracking.WaterDate = waterTracking.WaterDate;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/WaterTrackings/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWaterTracking(int id)
        {
            var waterTracking = await _context.WaterTrackings
                .FirstOrDefaultAsync(x => x.WaterID == id);

            if (waterTracking == null)
                return NotFound();

            _context.WaterTrackings.Remove(waterTracking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
