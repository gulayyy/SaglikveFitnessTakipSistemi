using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class Activity
    {
        public int ActivityID { get; set; }
        public int UserID { get; set; }
        public string ActivityType { get; set; }
        public int DurationInMinutes { get; set; }
        public decimal? CaloriesBurned { get; set; }
        public DateTime ActivityDate { get; set; }

        public virtual User User { get; set; }
    }
}
