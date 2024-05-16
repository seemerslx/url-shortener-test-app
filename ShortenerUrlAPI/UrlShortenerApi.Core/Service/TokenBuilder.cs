using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UrlShortenerApi.Core.Configuration;
using UrlShortenerApi.Core.Constants;
using UrlShortenerApi.Core.Interface;
using UrlShortenerAPI.Models.DTO;
using UrlShortenerAPI.Models.Interface;
using UrlShortenerAPI.Models.Model;

namespace UrlShortenerApi.Core.Service
{
    public class TokenBuilder : ITokenBuilder
    {
        private readonly UserManager<UserEntity> userManager;

        public TokenBuilder(UserManager<UserEntity> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<AuthenticationResponse> BuildToken(IUserCredentionals userCredentionals, JWTConfiguration configuration)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimConstants.Email, userCredentionals.Email),
            };

            if (userCredentionals is RegiterRequest regiterRequest)
                claims.Add(new Claim(ClaimConstants.Username, regiterRequest.Username));

            var user = await userManager.FindByEmailAsync(userCredentionals.Email);
            var claimList = await userManager.GetClaimsAsync(user!);

            foreach(var claim in claimList)
            {
                claims.Add(claim);
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.AccessTokenSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.Now.AddMinutes(configuration.AccessTokenExpirationMinutes);

            var token = new JwtSecurityToken(issuer: configuration.Issuer,
                audience: configuration.Audience,
                expires: expiration,
                signingCredentials: creds,
                claims: claims);

            var response = new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration,
            };
            return response;
        }
    }
}
