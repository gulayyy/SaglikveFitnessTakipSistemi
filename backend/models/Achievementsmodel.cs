using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class Achievement
    {
        public int AchievementID { get; set; }
        public int UserID { get; set; }
        public string AchievementName { get; set; }
        public DateTime AchievementDate { get; set; }
        public string Description { get; set; }
        public int? GoalID { get; set; }

        public virtual User User { get; set; }
    }
}
