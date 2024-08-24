namespace API.DTOs {
    public class WardenRegisterDto {
        
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Hostel { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Password { get; set; }
    }
}