namespace API.DTOs {
    public class StudentRegisterDto {
        
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Hostel { get; set; }
        public required int RoomNumber{ get; set; }
        public required string PhoneNumber { get; set; }
        public required string ParentPhoneNumber { get; set; }
        public required string Address { get; set; }
        public required string DepartmentAndCourse { get; set; }
        public required string Password { get; set; }
    }
}