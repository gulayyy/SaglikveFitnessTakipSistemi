using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class MedicalRecordsController : ControllerBase
{
    private readonly AppDbContext _context;

    public MedicalRecordsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/MedicalRecords
    [HttpGet]
    public async Task<IActionResult> GetMedicalRecords()
    {
        var medicalRecords = await _context.MedicalRecords.ToListAsync();
        return Ok(medicalRecords);
    }

    // GET: api/MedicalRecords/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMedicalRecord(int id)
    {
        var medicalRecord = await _context.MedicalRecords.FindAsync(id);
        if (medicalRecord == null) return NotFound();
        return Ok(medicalRecord);
    }

    // POST: api/MedicalRecords
    [HttpPost]
    public async Task<IActionResult> CreateMedicalRecord(MedicalRecord medicalRecord)
    {
        _context.MedicalRecords.Add(medicalRecord);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMedicalRecord), new { id = medicalRecord.RecordID }, medicalRecord);
    }

    // PUT: api/MedicalRecords/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMedicalRecord(int id, MedicalRecord medicalRecord)
    {
        if (id != medicalRecord.RecordID) return BadRequest();

        _context.Entry(medicalRecord).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/MedicalRecords/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMedicalRecord(int id)
    {
        var medicalRecord = await _context.MedicalRecords.FindAsync(id);
        if (medicalRecord == null) return NotFound();

        _context.MedicalRecords.Remove(medicalRecord);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
