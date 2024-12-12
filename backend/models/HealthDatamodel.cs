using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class HealthData
    {
        public int HealthDataID { get; set; }
        public int UserID { get; set; }
        public int Steps { get; set; }
        public decimal? Calories { get; set; }
        public int HeartRate { get; set; }
        public DateTime MeasurementDate { get; set; }

        public virtual User User { get; set; }
    }
}
