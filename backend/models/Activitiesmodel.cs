using System;
using System.Text.Json.Serialization;
namespace SaglikveFitnessTakipSistemi.Models
{
    public class Activity
    {
        public int ActivityID { get; set; }
        public int UserID { get; set; }
        public string? ActivityType { get; set; }
        public int DurationInMinutes { get; set; }
        public decimal? CaloriesBurned { get; set; }
        public DateTime ActivityDate { get; set; }

        [JsonIgnore] // Döngüyü önlemek için bu özelliği hariç tutar
        public virtual User? User { get; set; }
    }
}
