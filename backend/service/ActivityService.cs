using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class ActivityService
    {
        private readonly AppDbContext _context;

        public ActivityService(AppDbContext context)
        {
            _context = context;
        }

        // Kullanıcıya göre aktiviteleri getir
        public async Task<IEnumerable<Activity>> GetActivitiesByUserIdAsync(int userID)
        {
            var activities = await _context.Activities
                                            .Where(a => a.UserID == userID)
                                            .ToListAsync();

            return activities.Select(a => new Activity
            {
                ActivityID = a.ActivityID,
                ActivityType = a.ActivityType,
                DurationInMinutes = a.DurationInMinutes,
                CaloriesBurned = a.CaloriesBurned,
                ActivityDate = a.ActivityDate
            });
        }


        // Tüm aktiviteleri getir
        public async Task<IEnumerable<Activity>> GetAllActivitiesAsync()
        {
            return await _context.Activities
                                 .Include(a => a.User)
                                 .ToListAsync();
        }

        // ID'ye göre aktivite getir
        public async Task<Activity?> GetActivityByIdAsync(int id)
        {
            return await _context.Activities
                                 .Include(a => a.User)
                                 .FirstOrDefaultAsync(a => a.ActivityID == id);
        }

        // Yeni aktivite ekle
        public async Task<Activity> CreateActivityAsync(Activity activity)
        {
            try
            {
                _context.Activities.Add(activity);
                await _context.SaveChangesAsync();
                return activity;
            }
            catch (Exception ex)
            {
                // Loglama yapılabilir
                throw new Exception("Aktivite oluşturulurken bir hata oluştu.", ex);
            }
        }

        // Aktiviteyi güncelle
        public async Task<bool> UpdateActivityAsync(Activity activity)
        {
            var existingActivity = await _context.Activities.FindAsync(activity.ActivityID);
            if (existingActivity == null)
            {
                return false; // Güncellenecek veri bulunamadı
            }

            _context.Entry(existingActivity).CurrentValues.SetValues(activity);
            await _context.SaveChangesAsync();
            return true;
        }

        // Aktiviteyi sil
        public async Task<bool> DeleteActivityAsync(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return false; // Silinecek veri bulunamadı
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
