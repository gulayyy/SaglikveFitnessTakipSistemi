using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class GoalService
    {
        private readonly AppDbContext _context;

        public GoalService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Goal>> GetGoalsByUserIdAsync(int userId)
        {
            return await _context.Goals.Where(g => g.UserID == userId).Include(g => g.User).ToListAsync();
        }


        // Tüm hedefleri getir
        public async Task<IEnumerable<Goal>> GetAllGoalsAsync()
        {
            return await _context.Goals.Include(g => g.User).ToListAsync();
        }

        // ID'ye göre hedef getir
        public async Task<Goal?> GetGoalByIdAsync(int id)
        {
            return await _context.Goals.FindAsync(id);
        }

        // Yeni hedef oluştur
        public async Task<Goal> CreateGoalAsync(Goal goal)
        {
            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();
            return goal;
        }

        // Hedefi güncelle
        public async Task UpdateGoalAsync(Goal goal)
        {
            _context.Entry(goal).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // Hedefi sil
        public async Task DeleteGoalAsync(int id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal != null)
            {
                _context.Goals.Remove(goal);
                await _context.SaveChangesAsync();
            }
        }
    }
}