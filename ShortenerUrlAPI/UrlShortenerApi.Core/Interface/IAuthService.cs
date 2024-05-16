using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UrlShortenerApi.Core.Configuration;
using UrlShortenerAPI.Models.DTO;

namespace UrlShortenerApi.Core.Interface
{
    public interface IAuthService
    {
        Task<AuthenticationResponse> RegisterUser(RegiterRequest registerCredentionals,
            JWTConfiguration jwtConfiguration);
        Task<AuthenticationResponse> LoginUser(LoginRequest loginRequest,
           JWTConfiguration jWTConfiguration);
    }
}
