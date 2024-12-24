using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class ReminderService
    {
        private readonly AppDbContext _context;

        public ReminderService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Reminder>> GetRemindersByUserIdAsync(int userId)
        {
            return await _context.Reminders
                                 .Where(r => r.UserID == userId)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Reminder>> GetAllRemindersAsync()
        {
            return await _context.Reminders.Include(r => r.User).ToListAsync();
        }

        public async Task<Reminder?> GetReminderByIdAsync(int id)
        {
            return await _context.Reminders.FindAsync(id);
        }

        public async Task<Reminder> CreateReminderAsync(Reminder reminder)
        {
            _context.Reminders.Add(reminder);
            await _context.SaveChangesAsync();
            return reminder;
        }

        public async Task<bool> UpdateReminderAsync(Reminder reminder)
        {
            var existingReminder = await _context.Reminders.FindAsync(reminder.ReminderID);
            if (existingReminder == null) return false;

            _context.Entry(existingReminder).CurrentValues.SetValues(reminder);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteReminderAsync(int id)
        {
            var reminder = await _context.Reminders.FindAsync(id);
            if (reminder == null) return false;

            _context.Reminders.Remove(reminder);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
