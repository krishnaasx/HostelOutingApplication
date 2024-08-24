using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace API.Entities {
    public class Guards {
        
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
    }
}