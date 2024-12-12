using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class FitnessLevel
    {
        public int FitnessLevelID { get; set; }
        public int UserID { get; set; }
        public int FitnessScore { get; set; }
        public DateTime AssessmentDate { get; set; }
        public string Comments { get; set; }

        public virtual User User { get; set; }
    }
}
