using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UrlShortenerApi.Core.Configuration;
using UrlShortenerApi.Core.Constants;
using UrlShortenerApi.Core.Context;
using UrlShortenerApi.Core.Exceptions;
using UrlShortenerApi.Core.Interface;
using UrlShortenerAPI.Models.DTO;
using UrlShortenerAPI.Models.Model;

namespace UrlShortenerApi.Core.Service
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<UserEntity> userManager;
        private readonly ITokenBuilder tokenBuilder;
        private readonly SignInManager<UserEntity> signInManager;

        public AuthService(ApplicationDbContext context, UserManager<UserEntity> userManager, ITokenBuilder tokenBuilder, SignInManager<UserEntity> signInManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.tokenBuilder = tokenBuilder;
            this.signInManager = signInManager;
        }

        public async Task<AuthenticationResponse> LoginUser(LoginRequest loginRequest, JWTConfiguration jWTConfiguration)
        {
            UserEntity? signedUser = await userManager.FindByEmailAsync(loginRequest.Email);

            if (signedUser == null)
            {
                throw new BadRequestException("User not registered!");
            }

            var result = await signInManager.PasswordSignInAsync(signedUser.UserName,
                loginRequest.Password,
                isPersistent: false,
                lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return await tokenBuilder.BuildToken(loginRequest, jWTConfiguration);
            }
            else
            {
                throw new BadRequestException("Invalid credentionals");
            }
        }

        public async Task<AuthenticationResponse> RegisterUser(RegiterRequest registerCredentionals, JWTConfiguration jwtConfiguration)
        {
            if (await context.Users.AnyAsync(x=>x.Email == registerCredentionals.Email))
            {
                throw new Exception("This email address is already taken");
            }

            var user = new UserEntity { UserName = registerCredentionals.Username, Email = registerCredentionals.Email };

            var result = await userManager.CreateAsync(user, registerCredentionals.Password);

            if (result.Succeeded)
            {
                await userManager.AddClaimAsync(user, new Claim(ClaimConstants.Role, RolesConstants.User));
                return await tokenBuilder.BuildToken(registerCredentionals, jwtConfiguration);
            }
            else
            {
                throw new Exception(result.Errors.ToString());
            }
        }
    }
}
