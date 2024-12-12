using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class StressTracking
    {
        public int StressID { get; set; }
        public int UserID { get; set; }
        public int StressLevel { get; set; }
        public DateTime TrackingDate { get; set; }
        public string Notes { get; set; }

        public virtual User User { get; set; }
    }
}
