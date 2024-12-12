using System;
using System.Collections.Generic;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class User
    {
        public int UserID { get; set; }  // Primary Key
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int Age { get; set; }
        public decimal? Height { get; set; }
        public decimal? Weight { get; set; }
        public char Gender { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public virtual ICollection<Activity> Activities { get; set; }
        public virtual ICollection<HealthData> HealthDatas { get; set; }
    }
}
