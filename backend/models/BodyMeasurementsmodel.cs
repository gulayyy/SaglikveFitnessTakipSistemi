using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SaglikveFitnessTakipSistemi.Models
{
     public class BodyMeasurement
    {
        [Key] // Primary Key tanımı
        public int MeasurementID { get; set; }
        
        
        public decimal? Chest { get; set; }
        public decimal? Waist { get; set; }
        public decimal? Hips { get; set; }
        public decimal? Arm { get; set; }
        public decimal? Leg { get; set; }
        public DateTime MeasurementDate { get; set; }

        public int UserID { get; set; }
         [ForeignKey("UserID")]
        public virtual User? User { get; set; }
    }
}
