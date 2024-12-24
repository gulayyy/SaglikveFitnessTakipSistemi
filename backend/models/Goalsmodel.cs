using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class Goal
    {
        public int GoalID { get; set; }
        public int UserID { get; set; }
        public string? GoalName { get; set; }
        public decimal? TargetValue { get; set; }
        public decimal? CurrentValue { get; set; }
        public DateTime GoalStartDate { get; set; }
        public DateTime GoalEndDate { get; set; }

        public virtual User? User { get; set; }
    }
}
