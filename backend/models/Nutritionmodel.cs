using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class Nutrition
    {
        public int NutritionID { get; set; }
        public int UserID { get; set; }
        public string MealType { get; set; }
        public decimal? Calories { get; set; }
        public DateTime MealDate { get; set; }
        public int? DietPlanID { get; set; }

        public virtual User User { get; set; }
    }
}
