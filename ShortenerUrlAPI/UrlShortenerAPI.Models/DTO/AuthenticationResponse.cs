using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrlShortenerAPI.Models.DTO
{
    public class AuthenticationResponse
    {
        public string Token { get; set; } = null!;
        public DateTime Expiration { get; set; }
    }
}
