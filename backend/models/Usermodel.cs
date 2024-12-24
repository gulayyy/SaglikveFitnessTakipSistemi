using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace SaglikveFitnessTakipSistemi.Models
{
    public class User
    {
        public int UserID { get; set; }  // Primary Key
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int Age { get; set; }
        public decimal? Height { get; set; }
        public decimal? Weight { get; set; }
        public char Gender { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [JsonIgnore] // Döngüyü önlemek için bu özelliği hariç tutar
        public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
        public virtual ICollection<BodyMeasurement> BodyMeasurements { get; set; } = new List<BodyMeasurement>();
        public virtual ICollection<Reminder> Reminders { get; set; } = new List<Reminder>();
        public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();
        public virtual ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();
        public virtual ICollection<SleepTracking> SleepTrackings { get; set; } = new List<SleepTracking>();

        public virtual ICollection<WaterTracking> WaterTrackings {get; set;} = new List<WaterTracking>();

    }
}

