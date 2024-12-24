using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepTrackingController : ControllerBase
    {
        private readonly SleepTrackingService _service;

        public SleepTrackingController(SleepTrackingService service)
        {
            _service = service;
        }

        // GET: api/SleepTracking/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<SleepTracking>>> GetSleepTrackingsByUserId(int userId)
        {
            var sleepTrackings = await _service.GetSleepTrackingsByUserIdAsync(userId);
            if (sleepTrackings == null || !sleepTrackings.Any())
            {
                return NotFound("No sleep tracking records found for this user.");
            }
            return Ok(sleepTrackings);
        }



        // GET: api/SleepTracking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SleepTracking>>> GetAllSleepTrackings()
        {
            return Ok(await _service.GetAllSleepTrackingsAsync());
        }

        // GET: api/SleepTracking/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SleepTracking>> GetSleepTracking(int id)
        {
            var sleepTracking = await _service.GetSleepTrackingByIdAsync(id);
            if (sleepTracking == null)
            {
                return NotFound();
            }
            return Ok(sleepTracking);
        }

        // POST: api/SleepTracking
        [HttpPost]
        public async Task<ActionResult<SleepTracking>> CreateSleepTracking(SleepTracking sleepTracking)
        {
            var createdTracking = await _service.CreateSleepTrackingAsync(sleepTracking);
            return CreatedAtAction(nameof(GetSleepTracking), new { id = createdTracking.SleepID }, createdTracking);
        }

        // PUT: api/SleepTracking/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSleepTracking(int id, SleepTracking sleepTracking)
        {
            if (id != sleepTracking.SleepID)
            {
                return BadRequest();
            }

            await _service.UpdateSleepTrackingAsync(sleepTracking);
            return NoContent();
        }

        // DELETE: api/SleepTracking/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSleepTracking(int id)
        {
            await _service.DeleteSleepTrackingAsync(id);
            return NoContent();
        }
    }
}
