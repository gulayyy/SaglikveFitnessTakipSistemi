using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class MentalHealthTracking
    {
        public int MentalHealthID { get; set; }
        public int UserID { get; set; }
        public string Mood { get; set; }
        public string Notes { get; set; }
        public DateTime TrackingDate { get; set; }

        public virtual User User { get; set; }
    }
}
