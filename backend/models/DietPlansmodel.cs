using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class DietPlan
    {
        public int DietPlanID { get; set; }
        public int UserID { get; set; }
        public string PlanName { get; set; }
        public decimal? DailyCalorieLimit { get; set; }
        public decimal? ProteinPercentage { get; set; }
        public decimal? FatPercentage { get; set; }
        public decimal? CarbPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Notes { get; set; }

        public virtual User User { get; set; }
    }
}
