using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class OutingRequestController(DataContext context) : BaseApiController {
        
        [HttpPost("send-request")]
        public async Task<ActionResult<RequestForOutings>> SendRequest(RequestDto requestDto) {

            var verify = await context.StudentsDetail.FindAsync(requestDto.Id);
            if (verify is not null) {
                var request = new RequestForOutings {
                    Id = requestDto.Id,
                    Day = requestDto.Day,
                    Date = requestDto.Date,
                    Destination = requestDto.Destination,
                    OutTime = requestDto.OutTime,
                    InTime = requestDto.InTime
                };

                await context.OutingRequest.AddAsync(request);
                await context.SaveChangesAsync();
                return request;
            }else {
                return Unauthorized();
            }
            
        }

        [HttpGet("check-request")]
        public async Task<ActionResult<IEnumerable<RequestForOutings>>> SeeRequest() {
            var outings = await context.OutingRequest.ToListAsync();
            return outings;
        }

        [HttpGet("check-request/{id}")]
        public async Task<ActionResult<RequestForOutings>> CheckRequest(string id) {
            var request = await context.OutingRequest.FirstOrDefaultAsync(e => e.Id == id);
            if (request == null) return NotFound();
            return Ok(request);
        }
        

        [HttpPut("update-request/{id}")]
        public async Task<ActionResult<RequestForOutings>> WatchReqeust(int id, [FromBody] bool status) {
            
            var request = await context.OutingRequest.FirstOrDefaultAsync(e => e.RequestId == id);
            if ( request == null) return NotFound();

            request.Status = status;
            await context.SaveChangesAsync();

            if (status) {
                var history = new HistoryOfOutings {
                    StudentId = request.Id,
                    Day = request.Day,
                    Date = request.Date,
                    Destination = request.Destination,
                    OutTime = request.OutTime,
                    InTime = request.InTime
                };

                await context.OutingHistory.AddAsync(history);
                await context.SaveChangesAsync();
            }

            return request;
        }

        [HttpGet("see-history")]
        public async Task<ActionResult<IEnumerable<HistoryOfOutings>>> SeeHistory(){
            var history = await context.OutingHistory.ToListAsync();
            if (history == null) NotFound();
            return Ok(history);
        }

        [HttpGet("see-history/{id}")]
        public async Task<ActionResult<IEnumerable<HistoryOfOutings>>> SeeHistoryById(string id) {
            var history = await context.OutingHistory.Where(e => e.StudentId == id).ToListAsync();
            if (history == null) NotFound();
            return Ok(history);
        }

    }
}