using System.Net.Mime;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class OutingRequestController(DataContext context) : BaseApiController {
        
        [HttpPost("send-request")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<string>> SendRequest(RequestDto requestDto) {

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
            }else {
                return "The Student who is reqeusting is not registered!";
            }
            
            return "Reqeust has been sent to your warden";
        }

        [HttpGet("see-request")]
        [Authorize(Roles = "Warden")]
        public async Task<ActionResult<IEnumerable<RequestForOutings>>> SeeRequest() {
            var outings = await context.OutingRequest.ToListAsync();
            return outings;
        }

        /* [HttpGet("see-request/{id}")]
        public async Task<ActionResult<IEnumerable<RequestForOutings>>> SeeRequest(string id) {
            var outings = await context.OutingRequest.FindAsync(id);
            return Ok(outings);
        }
        */

        [HttpPut("update-request/{id}")]
        [Authorize(Roles = "Warden")]
        public async Task<ActionResult<RequestForOutings>> WatchReqeust(string id, [FromBody] bool status) {
            
            var request = await context.OutingRequest.FirstOrDefaultAsync(e => e.Id == id);
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

    }
}