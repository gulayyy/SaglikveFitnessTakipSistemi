using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class ExercisePlan
    {
        public int PlanID { get; set; }
        public int UserID { get; set; }
        public string ExerciseName { get; set; }
        public int DurationInMinutes { get; set; }
        public int FrequencyPerWeek { get; set; }

        public virtual User User { get; set; }
    }
}
