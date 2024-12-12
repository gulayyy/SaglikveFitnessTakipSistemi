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
        public DbSet<HealthData> HealthDatas { get; set; }
        public DbSet<SleepTracking> SleepTrackings { get; set; }
        public DbSet<Nutrition> Nutritions { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<ExercisePlan> ExercisePlans { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<WaterTracking> WaterTrackings { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<BodyMeasurement> BodyMeasurements { get; set; }
        public DbSet<StressTracking> StressTrackings { get; set; }
        public DbSet<FoodLog> FoodLogs { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<MotivationalQuote> MotivationalQuotes { get; set; }
        public DbSet<FitnessLevel> FitnessLevels { get; set; }
        public DbSet<MentalHealthTracking> MentalHealthTrackings { get; set; }
        public DbSet<DietPlan> DietPlans { get; set; }
    }
}
