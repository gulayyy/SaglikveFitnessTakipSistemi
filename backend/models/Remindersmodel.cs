using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class Reminder
    {
        public int ReminderID { get; set; }
        public int UserID { get; set; }
        public string? ReminderText { get; set; }
        public DateTime ReminderDate { get; set; }
        public bool IsCompleted { get; set; }

        public virtual User? User { get; set; }
    }
}
