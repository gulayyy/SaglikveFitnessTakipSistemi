using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;

namespace SaglikveFitnessTakipSistemi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Tablo temsil eden DbSet'ler
        public DbSet<User> Users { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<SleepTracking> SleepTrackings { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<WaterTracking> WaterTrackings { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<BodyMeasurement> BodyMeasurements { get; set; }
        public DbSet<MotivationalQuote> MotivationalQuotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Activity
            modelBuilder.Entity<Activity>(entity =>
            {
                entity.HasKey(a => a.ActivityID);
                entity.HasOne(a => a.User)
                    .WithMany(u => u.Activities)
                    .HasForeignKey(a => a.UserID);
            });

            // SleepTracking
            modelBuilder.Entity<SleepTracking>(entity =>
            {
                entity.HasKey(s => s.SleepID);
                entity.HasOne(s => s.User)
                    .WithMany(u => u.SleepTrackings)
                    .HasForeignKey(s => s.UserID);
            });
            // Goal
            modelBuilder.Entity<Goal>(entity =>
            {
                entity.HasKey(g => g.GoalID);
                entity.HasOne(g => g.User)
                    .WithMany(u => u.Goals)
                    .HasForeignKey(g => g.UserID);
            });
            // Reminder
            modelBuilder.Entity<Reminder>(entity =>
            {
                entity.HasKey(r => r.ReminderID);
                entity.HasOne(r => r.User)
                    .WithMany(u => u.Reminders)
                    .HasForeignKey(r => r.UserID);
            });

            // WaterTracking
            modelBuilder.Entity<WaterTracking>(entity =>
            {
                entity.HasKey(w => w.WaterID);
                entity.HasOne(w => w.User)
                    .WithMany(u => u.WaterTrackings)
                    .HasForeignKey(w => w.UserID);
            });
            // MedicalRecord
            modelBuilder.Entity<MedicalRecord>(entity =>
            {
                entity.HasKey(m => m.RecordID);
                entity.HasOne(m => m.User)
                    .WithMany(u => u.MedicalRecords)
                    .HasForeignKey(m => m.UserID);
            });

            // BodyMeasurement
            modelBuilder.Entity<BodyMeasurement>(entity =>
            {
                entity.HasKey(b => b.MeasurementID);
                entity.HasOne(b => b.User)
                    .WithMany(u => u.BodyMeasurements)
                    .HasForeignKey(b => b.UserID);
            });
            // MotivationalQuote
            modelBuilder.Entity<MotivationalQuote>(entity =>
            {
                entity.HasKey(m => m.QuoteID);
            });
           
        }
    }
}
