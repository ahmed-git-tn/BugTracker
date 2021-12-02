using BugTracker.Models;
using BugTracker.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BugTracker.Controllers
{
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        #region DI
        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        #endregion

        #region  GET Requests

        [Authorize(Policy = "admin")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users;

            return Ok(users);
        }

        [Authorize(Policy = "admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            return Ok(user);
        }
        #endregion



        #region PUT Requests
        [Authorize(Policy = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserDto userDTO)
        {
            var userSelected = await _userManager.FindByIdAsync(id);
            userSelected.IsAdmin = userDTO.IsAdmin;
            await _userManager.UpdateAsync(userSelected);

            return Ok();
        }
        #endregion


        #region DELETE Requests
        [Authorize(Policy = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(string id)
        {
            var userSelected = await _userManager.FindByIdAsync(id);
            await _userManager.DeleteAsync(userSelected);

            return NoContent();
        }
        #endregion
    }

}


