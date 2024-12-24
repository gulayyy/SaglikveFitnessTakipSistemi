using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class MedicalRecord
    {
        public int RecordID { get; set; }
        public int UserID { get; set; }
        public DateTime RecordDate { get; set; }
        public string? Diagnosis { get; set; }
        public string? Notes { get; set; }

        public virtual User? User { get; set; }
    }
}
