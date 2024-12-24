using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;
using Microsoft.EntityFrameworkCore;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        // Tüm kullanıcıları getir
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(u => u.Activities)
                .ToListAsync();
        }

        // Tek bir kullanıcıyı ID'ye göre getir
        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Activities)
                .FirstOrDefaultAsync(u => u.UserID == id);
        }

        // Yeni kullanıcı oluştur
        public async Task<User> CreateUserAsync(User user)
        {
            user.CreatedAt = DateTime.UtcNow; // Varsayılan olarak kayıt tarihi atanır
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // Kullanıcıyı güncelle
        public async Task<bool> UpdateUserAsync(User user)
        {
            var existingUser = await _context.Users.FindAsync(user.UserID);
            if (existingUser == null) return false;

            existingUser.UserName = user.UserName;
            existingUser.Email = user.Email;
            existingUser.Age = user.Age;
            existingUser.Height = user.Height;
            existingUser.Weight = user.Weight;
            existingUser.Gender = user.Gender;

            _context.Entry(existingUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        // Kullanıcıyı sil
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<User?> AuthenticateUserAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null) return null;

            // Şifre doğrulama (hashleme kullanılıyorsa burada kontrol edilmeli)
            if (user.PasswordHash != password) return null;

            return user;
        }
    }
}
