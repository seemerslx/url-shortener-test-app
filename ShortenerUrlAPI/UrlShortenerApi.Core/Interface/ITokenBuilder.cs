using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UrlShortenerApi.Core.Configuration;
using UrlShortenerAPI.Models.DTO;
using UrlShortenerAPI.Models.Interface;

namespace UrlShortenerApi.Core.Interface
{
    public interface ITokenBuilder
    {
        Task<AuthenticationResponse> BuildToken(IUserCredentionals userCredentionals, JWTConfiguration configuration);
    }
}
