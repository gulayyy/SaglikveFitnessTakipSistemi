using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class MedicalRecordService
    {
        private readonly AppDbContext _context;

        public MedicalRecordService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<MedicalRecord>> GetMedicalRecordsByUserIdAsync(int userId)
        {
            return await _context.MedicalRecords
                .Where(r => r.UserID == userId)
                .ToListAsync();
        }

        // Tüm kayıtları getir
        public async Task<IEnumerable<MedicalRecord>> GetAllMedicalRecordsAsync()
        {
            return await _context.MedicalRecords.Include(m => m.User).ToListAsync();
        }

        // ID'ye göre kayıt getir
        public async Task<MedicalRecord?> GetMedicalRecordByIdAsync(int id)
        {
            return await _context.MedicalRecords.FindAsync(id);
        }

        // Yeni kayıt oluştur
        public async Task<MedicalRecord> CreateMedicalRecordAsync(MedicalRecord record)
        {
            _context.MedicalRecords.Add(record);
            await _context.SaveChangesAsync();
            return record;
        }

        // Kaydı güncelle
        public async Task<bool> UpdateMedicalRecordAsync(MedicalRecord record)
        {
            var existingRecord = await _context.MedicalRecords.FindAsync(record.RecordID);
            if (existingRecord == null) return false;

            _context.Entry(existingRecord).CurrentValues.SetValues(record);
            await _context.SaveChangesAsync();
            return true;
        }

        // Kaydı sil
        public async Task<bool> DeleteMedicalRecordAsync(int id)
        {
            var record = await _context.MedicalRecords.FindAsync(id);
            if (record == null) return false;

            _context.MedicalRecords.Remove(record);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
