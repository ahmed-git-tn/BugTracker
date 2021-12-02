using BugTracker.Helpers;
using BugTracker.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BugTracker.Services
{
    public class AccessTokenGenerator
    {
        private readonly AuthenticationConfig _configuration;

        public AccessTokenGenerator(AuthenticationConfig configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(ApplicationUser ApplicationUser)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id", ApplicationUser.Id.ToString()),
                new Claim(ClaimTypes.Email, ApplicationUser.Email),
                new Claim(ClaimTypes.Name, ApplicationUser.UserName),
                new Claim("IsAdmin",ApplicationUser.IsAdmin.ToString())

            };

           
            SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.AccessTokenSecret));

            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(_configuration.Issuer,
                                                          _configuration.Audience,
                                                          claims,
                                                          DateTime.UtcNow,
                                                          DateTime.UtcNow.AddMinutes(_configuration.AccessTokenExpirationMinutes),
                                                          signingCredentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
