using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class WaterTrackingService
    {
        private readonly AppDbContext _context;

        public WaterTrackingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WaterTracking>> GetWaterTrackingsByUserIdAsync(int userId)
        {
            return await _context.WaterTrackings
                .Where(w => w.UserID == userId)
                .Include(w => w.User)
                .ToListAsync();
        }


        // Tüm su kayıtlarını getir
        public async Task<IEnumerable<WaterTracking>> GetAllWaterTrackingsAsync()
        {
            return await _context.WaterTrackings.Include(w => w.User).ToListAsync();
        }

        // ID'ye göre su kaydı getir
        public async Task<WaterTracking?> GetWaterTrackingByIdAsync(int id)
        {
            return await _context.WaterTrackings.FindAsync(id);
        }

        // Yeni su kaydı oluştur
        public async Task<WaterTracking> CreateWaterTrackingAsync(WaterTracking waterTracking)
        {
            _context.WaterTrackings.Add(waterTracking);
            await _context.SaveChangesAsync();
            return waterTracking;
        }

        // Su kaydını güncelle
        public async Task UpdateWaterTrackingAsync(WaterTracking waterTracking)
        {
            _context.Entry(waterTracking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // Su kaydını sil
        public async Task DeleteWaterTrackingAsync(int id)
        {
            var waterTracking = await _context.WaterTrackings.FindAsync(id);
            if (waterTracking != null)
            {
                _context.WaterTrackings.Remove(waterTracking);
                await _context.SaveChangesAsync();
            }
        }
    }
}
