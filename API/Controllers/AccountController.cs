using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
        public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController{
        
        
        [HttpPost("student/register")]
        public async Task<ActionResult<UserDto>> StudentRegister(StudentRegisterDto registerDto) {

            if( await StudentExists(registerDto.Id)) return BadRequest("Id already exists");
            using var hmac = new HMACSHA512();
            var student = new Students { 
                Id = registerDto.Id,
                Name = registerDto.Name,
                Hostel = registerDto.Hostel,
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
            return new UserDto {
                Id = student.Id,
                Token = tokenService.CreateToken(student)
            };

        }

        
        [HttpPost("warden/register")]
        public async Task<ActionResult<UserDto>> WardenRegister(WardenRegisterDto registerDto) {

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
            return new UserDto {
                Id = warden.Id,
                Token = tokenService.CreateToken(warden)
            };
        }

        [HttpPost("guard/register")]
        public async Task<ActionResult<UserDto>> GuardRegister(GuardRegisterDto registerDto) {
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
            return new UserDto {
                Id = guard.Id,
                Token = tokenService.CreateToken(guard)
            };
        }

        [HttpPost("admin/register")]
        public async Task<ActionResult<UserDto>> AdminRegister(AdminRegisterDto registerDto) {
            if(await AdminExists(registerDto.Id)) return BadRequest("Id already exists");
            using var hmac = new HMACSHA512();
            var admin = new Admin {
                Id = registerDto.Id,
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            await context.AdminDetail.AddAsync(admin);
            await context.SaveChangesAsync();
            return new UserDto {
                Id = admin.Id,
                Token = tokenService.CreateToken(admin)
            };
        }

        [HttpPost("student/login")]
        public async Task<ActionResult<UserDto>> StudentLogin(StudentLoginDto loginDto) {

            var student = await context.StudentsDetail.FirstOrDefaultAsync(x => x.Id == loginDto.Id);
            if(student == null) return Unauthorized("Invalid Id!");
            using var hmac = new HMACSHA512(student.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) {
                
                if (computeHash[i] != student.PasswordHash[i]) return Unauthorized("Invalid password!!");
            }

            return new UserDto {
                Id = loginDto.Id,
                Token = tokenService.CreateToken(student)
            };
        }


        [HttpPost("warden/login")]
        public async Task<ActionResult<UserDto>> WardenLogin(WardenLoginDto loginDto) {

            var warden = await context.WardensDetail.FirstOrDefaultAsync(x => x.Id == loginDto.Id);
            if(warden == null) return Unauthorized("Invalid Id!");
            using var hmac = new HMACSHA512(warden.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) {
                
                if (computeHash[i] != warden.PasswordHash[i]) return Unauthorized("Invalid password!!");
            }

            return new UserDto {
                Id = loginDto.Id,
                Token = tokenService.CreateToken(warden)
            };
        }

        [HttpPost("guard/login")]
        public async Task<ActionResult<UserDto>> GuardLogin(GuardLoginDto loginDto) {

            var guard = await context.GuardsDetail.FirstOrDefaultAsync(x => x.Id == loginDto.Id);
            if(guard == null) return Unauthorized("Invalid Id!");
            using var hmac = new HMACSHA512(guard.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) {
                
                if (computeHash[i] != guard.PasswordHash[i]) return Unauthorized("Invalid password!!");
            }

            return new UserDto {
                Id = loginDto.Id,
                Token = tokenService.CreateToken(guard)
            };
        }

        [HttpPost("admin/login")]
        public async Task<ActionResult<UserDto>> AdminLogin(AdminLoginDto loginDto) {
            
            var admin = await context.AdminDetail.FirstOrDefaultAsync(x => x.Id == loginDto.Id);
            if(admin == null) return Unauthorized("Invalid Id!");
            using var hmac = new HMACSHA512(admin.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) {
                
                if (computeHash[i] != admin.PasswordHash[i]) return Unauthorized("Invalid password!!");
            }

            return new UserDto {
                Id = loginDto.Id,
                Token = tokenService.CreateToken(admin)
            };
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

        private async Task<bool> AdminExists(string id) {
            return await context.AdminDetail.AnyAsync(x => x.Id == id);
        }

    }
}