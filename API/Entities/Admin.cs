using System.ComponentModel.DataAnnotations;

namespace API.Entities{
    public class Admin{
        
        [Key]
        public required string Id { get; set; }
        public required string UserName { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
    }
}