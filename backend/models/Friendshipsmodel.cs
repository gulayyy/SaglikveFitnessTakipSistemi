using System;

namespace SaglikveFitnessTakipSistemi.Models
{
    public class Friendship
    {
        public int FriendshipID { get; set; }
        public int UserID1 { get; set; }
        public int UserID2 { get; set; }
        public DateTime FriendshipDate { get; set; }

        public virtual User User1 { get; set; }
        public virtual User User2 { get; set; }
    }
}
