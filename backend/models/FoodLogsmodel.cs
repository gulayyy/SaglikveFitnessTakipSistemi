using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class FoodLog
    {
        public int LogID { get; set; }
        public int UserID { get; set; }
        public string FoodName { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Calories { get; set; }
        public DateTime LogDate { get; set; } = DateTime.Now;
        public string MealType { get; set; }
        public int? NutritionID { get; set; }

        // Navigation Properties
        public virtual User User { get; set; }
        public virtual Nutrition Nutrition { get; set; }
    }
}
