using System.Net.Mime;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class OutingRequestController(DataContext context) : BaseApiController {
        
        [HttpPost("send-request")]
        public async Task<ActionResult<RequestForOutings>> SendRequest(RequestDto requestDto) {

            var request = new RequestForOutings {
                Id = requestDto.Id,
                Name = requestDto.Name,
                Day = requestDto.Day,
                Destination = requestDto.Destination,
                OutTime = requestDto.OutTime,
                InTime = requestDto.InTime
            };

            await context.OutingRequest.AddAsync(request);
            await context.SaveChangesAsync();
            return request;

        }

        [HttpGet("see-request")]
        public async Task<ActionResult<RequestForOutings>> SeeRequest() {
            var outings = await context.OutingRequest.ToListAsync();
            return Ok(outings);
        }

        [HttpPut("watch-request/{id}")]
        public async Task<ActionResult<RequestForOutings>> WatchReqeust(string id, [FromBody] bool status) {
            
            var request = await context.OutingRequest.FirstOrDefaultAsync();
            if ( request == null) return NotFound();

            request.Status = status;
            await context.SaveChangesAsync();

            if (status) {
                var history = new HistoryOfOutings {
                    StudentId = request.Id,
                    Name = request.Name,
                    Day = request.Day,
                    Destination = request.Destination,
                    OutTime = request.OutTime,
                    InTime = request.InTime
                };

                await context.OutingHistory.AddAsync(history);
                await context.SaveChangesAsync();
            }

            return request;
        }

    }
}