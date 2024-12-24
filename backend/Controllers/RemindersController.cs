using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReminderController : ControllerBase
    {
        private readonly ReminderService _service;

        public ReminderController(ReminderService service)
        {
            _service = service;
        }

        // GET: api/Reminder/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Reminder>>> GetRemindersByUser(int userId)
        {
            var reminders = await _service.GetRemindersByUserIdAsync(userId);
            if (reminders == null || !reminders.Any())
            {
                return NotFound(new { message = "No reminders found for this user." });
            }
            return Ok(reminders);
        }


        // GET: api/Reminder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reminder>>> GetAllReminders()
        {
            return Ok(await _service.GetAllRemindersAsync());
        }

        // GET: api/Reminder/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Reminder>> GetReminder(int id)
        {
            var reminder = await _service.GetReminderByIdAsync(id);
            if (reminder == null)
            {
                return NotFound();
            }
            return Ok(reminder);
        }

        // POST: api/Reminder
        [HttpPost]
        public async Task<ActionResult<Reminder>> CreateReminder(Reminder reminder)
        {
            var createdReminder = await _service.CreateReminderAsync(reminder);
            return CreatedAtAction(nameof(GetReminder), new { id = createdReminder.ReminderID }, createdReminder);
        }

        // PUT: api/Reminder/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReminder(int id, Reminder reminder)
        {
            if (id != reminder.ReminderID)
            {
                return BadRequest();
            }

            await _service.UpdateReminderAsync(reminder);
            return NoContent();
        }

        // DELETE: api/Reminder/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminder(int id)
        {
            await _service.DeleteReminderAsync(id);
            return NoContent();
        }
    }
}
