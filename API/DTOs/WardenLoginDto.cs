using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs {
    public class WardenLoginDto {
        
        public required string Id { get; set; }
        public required string Password { get; set; }
    }
}