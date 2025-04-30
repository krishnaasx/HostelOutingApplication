using System.ComponentModel.DataAnnotations;

namespace API.Entities {
    public class HistoryOfOutings {
        
        [Key]
        public int SerialNumber { get; set; }
        public required string StudentId { get; set; }
        public required string Day { get; set; }
        public required string Date { get; set; }
        public required string Destination { get; set; }
        public required string OutTime { get; set; }
        public required string InTime { get; set; }
        public bool InStatus { get; set; } = false;
    }
}