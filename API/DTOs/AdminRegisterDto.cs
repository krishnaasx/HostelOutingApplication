using System.ComponentModel.DataAnnotations;

namespace API.DTOs {
    public class AdminRegisterDto {
        
        public required string Id { get; set; }
        public required string Username { get; set; }
        
        [StringLength(8,MinimumLength = 4)]
        public required string Password { get; set; }
    }
}