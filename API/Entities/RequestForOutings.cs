using System.ComponentModel.DataAnnotations;

namespace API.Entities {
    public class RequestForOutings {
        
        [Key]
        public int RequestId { get; set; }
        public required string Id { get; set;}
        public required string Day { get; set; }
        public required string Date { get; set; }
        public required string Destination { get; set; }
        public required string OutTime { get; set; }
        public required string InTime { get; set; }
        public bool Status { get; set; } = false;
        
    }
}