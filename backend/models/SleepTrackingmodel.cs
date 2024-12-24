using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class SleepTracking
    {
        public int SleepID { get; set; }
        public int UserID { get; set; }
        public DateTime SleepStart { get; set; }
        public DateTime SleepEnd { get; set; }

        // Computed Property
        public int TotalSleepHours => (int)(SleepEnd - SleepStart).TotalHours;

        // Navigation Property
        public virtual User? User { get; set; }
    }
}
