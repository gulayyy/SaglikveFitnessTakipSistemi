using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordController : ControllerBase
    {
        private readonly MedicalRecordService _service;

        public MedicalRecordController(MedicalRecordService service)
        {
            _service = service;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<MedicalRecord>>> GetMedicalRecordsByUser(int userId)
        {
            var records = await _service.GetMedicalRecordsByUserIdAsync(userId);
            if (records == null || !records.Any())
            {
                return NotFound(new { message = "No records found for the given user ID." });
            }
            return Ok(records);
        }


        // GET: api/MedicalRecord
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalRecord>>> GetAllMedicalRecords()
        {
            return Ok(await _service.GetAllMedicalRecordsAsync());
        }

        // GET: api/MedicalRecord/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalRecord>> GetMedicalRecord(int id)
        {
            var record = await _service.GetMedicalRecordByIdAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            return Ok(record);
        }

        // POST: api/MedicalRecord
        [HttpPost]
        public async Task<ActionResult<MedicalRecord>> CreateMedicalRecord(MedicalRecord record)
        {
            var createdRecord = await _service.CreateMedicalRecordAsync(record);
            return CreatedAtAction(nameof(GetMedicalRecord), new { id = createdRecord.RecordID }, createdRecord);
        }

        // PUT: api/MedicalRecord/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMedicalRecord(int id, MedicalRecord record)
        {
            if (id != record.RecordID)
            {
                return BadRequest();
            }

            await _service.UpdateMedicalRecordAsync(record);
            return NoContent();
        }

        // DELETE: api/MedicalRecord/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalRecord(int id)
        {
            await _service.DeleteMedicalRecordAsync(id);
            return NoContent();
        }
    }
}
