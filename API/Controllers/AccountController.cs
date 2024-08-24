using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class AccountController(DataContext context) : BaseApiController{
        
        [HttpPost("student/register")]
        public async Task<ActionResult<Students>> StudentRegister(StudentRegisterDto registerDto) {

            if( await StudentExists(registerDto.Id)) return BadRequest("Id already exists");
            using var hmac = new HMACSHA512();
            var student = new Students { 
                Id = registerDto.Id,
                Name = registerDto.Name,
                RoomNumber = registerDto.RoomNumber,
                PhoneNumber = registerDto.PhoneNumber,
                ParentPhoneNumber = registerDto.ParentPhoneNumber,
                Address = registerDto.Address,
                DepartmentAndCourse = registerDto.DepartmentAndCourse,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            await context.StudentsDetail.AddAsync(student);
            await context.SaveChangesAsync();
            return student;

        }

        [HttpPost("warden/register")]
        public async Task<ActionResult<Wardens>> WardenRegister(WardenRegisterDto registerDto) {

            if(await WardenExists(registerDto.Id)) return BadRequest("Id already exists");
            using var hmac = new HMACSHA512();
            var warden = new Wardens {
                Id = registerDto.Id,
                Name = registerDto.Name,
                Hostel = registerDto.Hostel,
                PhoneNumber = registerDto.PhoneNumber,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            await context.WardensDetail.AddAsync(warden);
            await context.SaveChangesAsync();
            return warden;
        }

        [HttpPost("guard/register")]
        public async Task<ActionResult<Guards>> GuardRegister(GuardRegisterDto registerDto) {
            if(await GuardExists(registerDto.Id)) return BadRequest("Id already exists");
            using var hmac = new HMACSHA512();
            var guard = new Guards {
                Id = registerDto.Id,
                Name = registerDto.Name,
                PhoneNumber = registerDto.PhoneNumber,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            await context.GuardsDetail.AddAsync(guard);
            await context.SaveChangesAsync();
            return guard;
        }

        [HttpPost("student/login")]
        public async Task<ActionResult<Students>> StudentLogin(StudentLoginDto loginDto) {

            var student = await context.StudentsDetail.FirstOrDefaultAsync(x => x.Id == loginDto.Id);
            if(student == null) return Unauthorized("Invalid Id!");
            using var hmac = new HMACSHA512(student.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) {
                
                if (computeHash[i] != student.PasswordHash[i]) return Unauthorized("Invalid password!!");
            }

            return Ok(student);
        }


        [HttpPost("warden/login")]
        public async Task<ActionResult<Wardens>> WardenLogin(WardenLoginDto loginDto) {

            var warden = await context.WardensDetail.FirstOrDefaultAsync(x => x.Id == loginDto.Id);
            if(warden == null) return Unauthorized("Invalid Id!");
            using var hmac = new HMACSHA512(warden.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) {
                
                if (computeHash[i] != warden.PasswordHash[i]) return Unauthorized("Invalid password!!");
            }

            return Ok(warden);
        }

        [HttpPost("guard/login")]
        public async Task<ActionResult<Guards>> GuardLogin(GuardLoginDto loginDto) {

            var guard = await context.GuardsDetail.FirstOrDefaultAsync(x => x.Id == loginDto.Id);
            if(guard == null) return Unauthorized("Invalid Id!");
            using var hmac = new HMACSHA512(guard.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) {
                
                if (computeHash[i] != guard.PasswordHash[i]) return Unauthorized("Invalid password!!");
            }

            return Ok(guard);
        }

        

        private async Task<bool> WardenExists(string id) {
            return await context.WardensDetail.AnyAsync(x => x.Id == id);
        }

        private async Task<bool> StudentExists(string id) {
            return await context.StudentsDetail.AnyAsync( x => x.Id == id);
        }

        private async Task<bool> GuardExists(string id) {
            return await context.GuardsDetail.AnyAsync( x => x.Id == id);
        }

    }
}