using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;

namespace SaglikveFitnessTakipSistemi.Services
{
    public class MotivationalQuoteService
    {
        private readonly AppDbContext _context;

        public MotivationalQuoteService(AppDbContext context)
        {
            _context = context;
        }

        // Tüm alıntıları getir
        public async Task<IEnumerable<MotivationalQuote>> GetAllQuotesAsync()
        {
            return await _context.MotivationalQuotes.ToListAsync();
        }

        // ID'ye göre alıntı getir
        public async Task<MotivationalQuote?> GetQuoteByIdAsync(int id)
        {
            return await _context.MotivationalQuotes.FindAsync(id);
        }

        // Yeni alıntı oluştur
        public async Task<MotivationalQuote> CreateQuoteAsync(MotivationalQuote quote)
        {
            _context.MotivationalQuotes.Add(quote);
            await _context.SaveChangesAsync();
            return quote;
        }

        // Alıntıyı güncelle
        public async Task<bool> UpdateQuoteAsync(MotivationalQuote quote)
        {
            var existingQuote = await _context.MotivationalQuotes.FindAsync(quote.QuoteID);
            if (existingQuote == null) return false;

            _context.Entry(existingQuote).CurrentValues.SetValues(quote);
            await _context.SaveChangesAsync();
            return true;
        }

        // Alıntıyı sil
        public async Task<bool> DeleteQuoteAsync(int id)
        {
            var quote = await _context.MotivationalQuotes.FindAsync(id);
            if (quote == null) return false;

            _context.MotivationalQuotes.Remove(quote);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
