using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class WaterTracking
    {
        public int WaterID { get; set; }
        public int UserID { get; set; }
        public decimal WaterAmountInLiters { get; set; }
        public DateTime WaterDate { get; set; }

        public virtual User? User { get; set; }
    }
}
