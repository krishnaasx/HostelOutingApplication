using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities {
    public class Students {
        
    
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required int RoomNumber{ get; set; }
        public required string PhoneNumber { get; set; }
        public required string ParentPhoneNumber { get; set; }
        public required string Address { get; set; }
        public required string DepartmentAndCourse { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
        
    }
}