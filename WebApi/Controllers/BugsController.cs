using BugTracker.Models;
using BugTracker.Models.DTOs;
using BugTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugTracker.Controllers
{

    [Route("api/bugs")]
    public class BugsController : Controller
    {
        #region Dependency Injection

        private IBugRepository _bugRepository;
        public BugsController(IBugRepository bugRepository, UserManager<ApplicationUser> userManager)
        {
            _bugRepository = bugRepository;
        }

        #endregion


        #region Get Requests
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllUserBug()
        {
            var userId = HttpContext.User.Claims.ToList().Find(c => c.Type == "id").Value;
            var userBugs = await _bugRepository.GetBugsByUserId(userId);
            List<BugDto> bugDtos = new List<BugDto>();
            foreach (var bug in userBugs) bugDtos.Add(new BugDto(bug.Id,bug.Title, bug.Description, bug.State, bug.Priority));
            return Ok(bugDtos);
        }
        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserBugById(int id)
        {
            var userBug = await _bugRepository.GetBugById(id);
            if (userBug == null) return NotFound();
            var bugDto = new BugDto(userBug.Id, userBug.Title, userBug.Description, userBug.State, userBug.Priority);
            return Ok(bugDto);
        }

        #endregion

        #region Post Requests
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Bug bug)
        {
            if (!ModelState.IsValid)
            {
                var message = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors)
                                                                   .Select(e => e.ErrorMessage));
                return BadRequest(message);
            }

            var userClaims = HttpContext.User.Claims.ToList();
            var userId = userClaims.Find(c => c.Type == "id").Value;

            var createdBug = await _bugRepository.AddBugByUser(userId,bug);
            return CreatedAtAction(nameof(GetUserBugById), new { id = bug.Id }, createdBug);
        }

        #endregion

        #region PUT Requests
        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Bug bug)
        {
            if (!ModelState.IsValid)
            {
                var message = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors)
                                                                   .Select(e => e.ErrorMessage));
                return BadRequest(message);
            }

            bool isUpdated = await _bugRepository.UpdateBug(id, bug);
            return Ok(isUpdated);
        }

        #endregion


        #region Delete Requests

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var isDeleted = await _bugRepository.DeleteBugById(id);
            if (isDeleted) return NoContent();
            return NotFound();
        }
        #endregion

    }
}
