using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BodyMeasurementController : ControllerBase
    {
        private readonly BodyMeasurementService _service;

        public BodyMeasurementController(BodyMeasurementService service)
        {
            _service = service;
        }

        // Kullanıcıya göre body measurements getir
        [HttpGet("user/{userID}")]
        public async Task<ActionResult<IEnumerable<BodyMeasurement>>> GetBodyMeasurementsByUser(int userID)
        {
            var bodyMeasurements = await _service.GetBodyMeasurementsByUserAsync(userID);

            if (bodyMeasurements == null || !bodyMeasurements.Any())
            {
                return NotFound(new { message = "No body measurements found for this user." });
            }

            return Ok(bodyMeasurements);
        }


        // GET: api/BodyMeasurement
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BodyMeasurement>>> GetAllBodyMeasurements()
        {
            return Ok(await _service.GetAllBodyMeasurementsAsync());
        }

        // GET: api/BodyMeasurement/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BodyMeasurement>> GetBodyMeasurement(int id)
        {
            var bodyMeasurement = await _service.GetBodyMeasurementByIdAsync(id);
            if (bodyMeasurement == null)
            {
                return NotFound();
            }
            return Ok(bodyMeasurement);
        }

        // POST: api/BodyMeasurement
        [HttpPost]
        public async Task<ActionResult<BodyMeasurement>> CreateBodyMeasurement(BodyMeasurement bodyMeasurement)
        {
            var createdMeasurement = await _service.CreateBodyMeasurementAsync(bodyMeasurement);
            return CreatedAtAction(nameof(GetBodyMeasurement), new { id = createdMeasurement.MeasurementID }, createdMeasurement);
        }

        // PUT: api/BodyMeasurement/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBodyMeasurement(int id, BodyMeasurement bodyMeasurement)
        {
            if (id != bodyMeasurement.MeasurementID)
            {
                return BadRequest();
            }

            await _service.UpdateBodyMeasurementAsync(bodyMeasurement);
            return NoContent();
        }

        // DELETE: api/BodyMeasurement/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBodyMeasurement(int id)
        {
            await _service.DeleteBodyMeasurementAsync(id);
            return NoContent();
        }
    }
}
