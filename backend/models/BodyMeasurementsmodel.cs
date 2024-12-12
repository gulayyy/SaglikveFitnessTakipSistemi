using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class BodyMeasurement
    {
        public int MeasurementID { get; set; }
        public int UserID { get; set; }
        public decimal? Chest { get; set; }
        public decimal? Waist { get; set; }
        public decimal? Hips { get; set; }
        public decimal? Arm { get; set; }
        public decimal? Leg { get; set; }
        public DateTime MeasurementDate { get; set; }

        public virtual User User { get; set; }
    }
}
