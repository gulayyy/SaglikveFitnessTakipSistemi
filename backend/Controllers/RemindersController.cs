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
    public class RemindersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RemindersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Reminders
        [HttpGet]
        public async Task<IActionResult> GetReminders()
        {
            var reminders = await _context.Reminders.ToListAsync();
            return Ok(reminders);
        }

        // GET: api/Reminders/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReminder(int id)
        {
            var reminder = await _context.Reminders
                .FirstOrDefaultAsync(x => x.ReminderID == id);

            if (reminder == null)
                return NotFound();

            return Ok(reminder);
        }

        // POST: api/Reminders
        [HttpPost]
        public async Task<IActionResult> CreateReminder([FromBody] Reminder reminder)
        {
            if (reminder == null)
                return BadRequest();

            _context.Reminders.Add(reminder);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReminder), new { id = reminder.ReminderID }, reminder);
        }

        // PUT: api/Reminders/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReminder(int id, [FromBody] Reminder reminder)
        {
            if (id != reminder.ReminderID)
                return BadRequest();

            var existingReminder = await _context.Reminders
                .FirstOrDefaultAsync(x => x.ReminderID == id);

            if (existingReminder == null)
                return NotFound();

            existingReminder.ReminderText = reminder.ReminderText;
            existingReminder.ReminderDate = reminder.ReminderDate;
            existingReminder.IsCompleted = reminder.IsCompleted;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Reminders/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminder(int id)
        {
            var reminder = await _context.Reminders
                .FirstOrDefaultAsync(x => x.ReminderID == id);

            if (reminder == null)
                return NotFound();

            _context.Reminders.Remove(reminder);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
