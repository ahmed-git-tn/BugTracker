using BugTracker.Models;
using BugTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BugTracker.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        #region DI
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        #endregion

        #region Register 
        [HttpPost("register")] 
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        { 
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (registerDto.Password != registerDto.ConfirmPassword)
            {
                return BadRequest("Password does not match confirm password.");
            }

            ApplicationUser registrationUser = new ApplicationUser()
            {
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            IdentityResult result = await _userManager.CreateAsync(registrationUser, registerDto.Password);
            if (!result.Succeeded)
            {
                IdentityErrorDescriber errorDescriber = new IdentityErrorDescriber();
                IdentityError primaryError = result.Errors.FirstOrDefault();

                if (primaryError.Code == nameof(errorDescriber.DuplicateEmail))
                {
                    return Conflict("Email already exists.");
                }
                else if (primaryError.Code == nameof(errorDescriber.DuplicateUserName))
                {
                    return Conflict("UserName already exists.");
                }
            }

            return Ok("welcome " + registrationUser.UserName);
        }

        #endregion

        #region Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromServices] AccessTokenGenerator accessTokenGenerator ,[FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ApplicationUser user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user == null)
            {
                return Unauthorized("user name doesn't exsist");
            }

            bool isCorrectPassword = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isCorrectPassword)
            {
                return Unauthorized("incorrect Password");
            }

            string accessToken = accessTokenGenerator.GenerateToken(user);

            return Ok(accessToken);

        }

        #endregion

        #region Log out
        [Authorize]
        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            return NoContent();
        }
        #endregion
    }
}

