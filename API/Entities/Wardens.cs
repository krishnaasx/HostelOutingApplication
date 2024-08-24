namespace API.Entities {
    public class Wardens {
        
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Hostel { get; set; }
        public required string PhoneNumber { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
        
    }
}