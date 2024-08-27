using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {

    public class ProfileController(DataContext context) : BaseApiController { 

        private async Task<ActionResult<IEnumerable<T>>> GetEntities<T>(DbSet<T> dbSet) where T : class {
            var entities = await dbSet.ToListAsync();
            return entities;
        }

        private async Task<ActionResult<T>> GetEntityById<T>(DbSet<T> dbSet, string id) where T : class {
            var entity = await dbSet.FindAsync(id);
            if (entity == null) return NotFound();
            return entity;
        }

        [HttpGet("{entityType}")]
        public async Task<ActionResult<IEnumerable<object>>> GetEntities(string entityType) {
            return entityType.ToLower() switch {
                "students" => (ActionResult<IEnumerable<object>>)Ok(await GetEntities(context.StudentsDetail)),
                "wardens" => (ActionResult<IEnumerable<object>>)Ok(await GetEntities(context.WardensDetail)),
                "guards" => (ActionResult<IEnumerable<object>>)Ok(await GetEntities(context.GuardsDetail)),
                "history" => (ActionResult<IEnumerable<object>>)Ok(await GetEntities(context.OutingHistory)),
                "requests" => (ActionResult<IEnumerable<object>>)Ok(await GetEntities(context.OutingRequest)),
                _ => (ActionResult<IEnumerable<object>>)BadRequest("Invalid entity type in the url"),
            };
        }

        [HttpGet("{entityType}/{id}")]
        public async Task<ActionResult<object>> GetEntity(string entityType, string id) {
            return entityType.ToLower() switch {
                "students" => (ActionResult<object>)await GetEntityById(context.StudentsDetail, id),
                "wardens" => (ActionResult<object>)await GetEntityById(context.WardensDetail, id),
                "guards" => (ActionResult<object>)await GetEntityById(context.GuardsDetail, id),
                "history" => (ActionResult<object>)await GetEntityById(context.OutingHistory, id),
                "requests" => (ActionResult<object>)await GetEntityById(context.OutingRequest, id),
                _ => (ActionResult<object>)BadRequest("Invalid entity type in the url"),
            };
        }
        
    }
}