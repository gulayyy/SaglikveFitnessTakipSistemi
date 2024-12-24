using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class SleepTrackingService
    {
        private readonly AppDbContext _context;

        public SleepTrackingService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SleepTracking>> GetSleepTrackingsByUserIdAsync(int userId)
        {
            return await _context.SleepTrackings
                .Where(s => s.UserID == userId)
                .Include(s => s.User)
                .ToListAsync();
        }
        public async Task<IEnumerable<SleepTracking>> GetAllSleepTrackingsAsync()
        {
            return await _context.SleepTrackings.Include(s => s.User).ToListAsync();
        }

        public async Task<SleepTracking?> GetSleepTrackingByIdAsync(int id)
        {
            return await _context.SleepTrackings.FindAsync(id);
        }

        public async Task<SleepTracking> CreateSleepTrackingAsync(SleepTracking sleepTracking)
        {
            _context.SleepTrackings.Add(sleepTracking);
            await _context.SaveChangesAsync();
            return sleepTracking;
        }

        public async Task<bool> UpdateSleepTrackingAsync(SleepTracking sleepTracking)
        {
            var existingTracking = await _context.SleepTrackings.FindAsync(sleepTracking.SleepID);
            if (existingTracking == null) return false;

            _context.Entry(existingTracking).CurrentValues.SetValues(sleepTracking);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSleepTrackingAsync(int id)
        {
            var tracking = await _context.SleepTrackings.FindAsync(id);
            if (tracking == null) return false;

            _context.SleepTrackings.Remove(tracking);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
