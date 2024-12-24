using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class BodyMeasurementService
    {
        private readonly AppDbContext _context;

        public BodyMeasurementService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<BodyMeasurement>> GetBodyMeasurementsByUserAsync(int userID)
        {
            return await _context.BodyMeasurements
                                 .Where(b => b.UserID == userID)
                                 .ToListAsync();
        }


        // Tüm vücut ölçümlerini getir
        public async Task<IEnumerable<BodyMeasurement>> GetAllBodyMeasurementsAsync()
        {
            return await _context.BodyMeasurements.Include(b => b.User).ToListAsync();
        }

        // ID'ye göre vücut ölçümünü getir
        public async Task<BodyMeasurement?> GetBodyMeasurementByIdAsync(int id)
        {
            return await _context.BodyMeasurements.Include(b => b.User).FirstOrDefaultAsync(b => b.MeasurementID == id);
        }

        // Yeni vücut ölçümü ekle
        public async Task<BodyMeasurement> CreateBodyMeasurementAsync(BodyMeasurement bodyMeasurement)
        {
            _context.BodyMeasurements.Add(bodyMeasurement);
            await _context.SaveChangesAsync();
            return bodyMeasurement;
        }

        // Vücut ölçümünü güncelle
        public async Task UpdateBodyMeasurementAsync(BodyMeasurement bodyMeasurement)
        {
            _context.Entry(bodyMeasurement).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // Vücut ölçümünü sil
        public async Task DeleteBodyMeasurementAsync(int id)
        {
            var bodyMeasurement = await _context.BodyMeasurements.FindAsync(id);
            if (bodyMeasurement != null)
            {
                _context.BodyMeasurements.Remove(bodyMeasurement);
                await _context.SaveChangesAsync();
            }
        }
    }
}
