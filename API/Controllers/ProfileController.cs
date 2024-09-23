using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {

    public class ProfileController(DataContext context) : BaseApiController { 


        [HttpGet("students")]
        public async Task<ActionResult<IEnumerable<Students>>> GetStudents() {
            var students = await context.StudentsDetail.ToListAsync();
            return students;
        }
        [HttpGet("wardens")]
        public async Task<ActionResult<IEnumerable<Wardens>>> GetWarden() {
            var warden = await context.WardensDetail.ToListAsync();
            return warden;
        }
        [HttpGet("guards")]
        public async Task<ActionResult<IEnumerable<Guards>>> GetGuards() {
            var guards = await context.GuardsDetail.ToListAsync();
            return guards;
        }


        [HttpGet("students/{id}")]
        public async Task<ActionResult<Students>> GetStudent(string id) {
            var student = await context.StudentsDetail.FindAsync(id);
            if (student == null) return NotFound();
            return student; 
        }

        [HttpGet("wardens/{id}")]
        public async Task<ActionResult<Wardens>> GetWarden(string id) {
            var warden = await context.WardensDetail.FindAsync(id);
            if (warden == null) return NotFound();
            return warden; 
        }

        [HttpGet("guards/{id}")]
        public async Task<ActionResult<Guards>> GetGuards(string id) {
            var guard = await context.GuardsDetail.FindAsync(id);
            if (guard == null) return NotFound();
            return guard; 
        } 
        
        
    }
}