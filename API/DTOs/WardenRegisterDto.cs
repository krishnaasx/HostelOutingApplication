using System.ComponentModel.DataAnnotations;

namespace API.DTOs {
    public class WardenRegisterDto {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Hostel { get; set; }
        public required string PhoneNumber { get; set; }
        [StringLength(8,MinimumLength = 4)]
        public required string Password { get; set; }
    }
}