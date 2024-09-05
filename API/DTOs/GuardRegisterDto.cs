using System.ComponentModel.DataAnnotations;

namespace API.DTOs {
    public class GuardRegisterDto {
        
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
        
        [StringLength(8, MinimumLength = 4)]
        public required string Password { get; set; }
        
    }
}