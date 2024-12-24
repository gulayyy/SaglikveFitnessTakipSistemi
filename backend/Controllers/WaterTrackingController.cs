using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterTrackingController : ControllerBase
    {
        private readonly WaterTrackingService _service;

        public WaterTrackingController(WaterTrackingService service)
        {
            _service = service;
        }

        // GET: api/WaterTracking/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<WaterTracking>>> GetWaterTrackingsByUserId(int userId)
        {
            var waterTrackings = await _service.GetWaterTrackingsByUserIdAsync(userId);
            if (waterTrackings == null || !waterTrackings.Any())
            {
                return NotFound("No water tracking records found for this user.");
            }
            return Ok(waterTrackings);
        }


        // GET: api/WaterTracking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaterTracking>>> GetAllWaterTrackings()
        {
            return Ok(await _service.GetAllWaterTrackingsAsync());
        }

        // GET: api/WaterTracking/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<WaterTracking>> GetWaterTracking(int id)
        {
            var waterTracking = await _service.GetWaterTrackingByIdAsync(id);
            if (waterTracking == null)
            {
                return NotFound();
            }
            return Ok(waterTracking);
        }

        // POST: api/WaterTracking
        [HttpPost]
        public async Task<ActionResult<WaterTracking>> CreateWaterTracking(WaterTracking waterTracking)
        {
            var createdTracking = await _service.CreateWaterTrackingAsync(waterTracking);
            return CreatedAtAction(nameof(GetWaterTracking), new { id = createdTracking.WaterID }, createdTracking);
        }

        // PUT: api/WaterTracking/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWaterTracking(int id, WaterTracking waterTracking)
        {
            if (id != waterTracking.WaterID)
            {
                return BadRequest();
            }

            await _service.UpdateWaterTrackingAsync(waterTracking);
            return NoContent();
        }

        // DELETE: api/WaterTracking/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWaterTracking(int id)
        {
            await _service.DeleteWaterTrackingAsync(id);
            return NoContent();
        }
    }
}
