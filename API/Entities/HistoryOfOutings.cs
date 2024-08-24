namespace API.Entities {
    public class HistoryOfOutings {
        
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Day { get; set; }
        public required string Destination { get; set; }
        public required string OutTime { get; set; }
        public required string InTime { get; set; }
        
    }
}